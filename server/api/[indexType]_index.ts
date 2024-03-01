import axios from 'axios';
import algoliasearch from 'algoliasearch';
import sizeOf from 'image-size';
import https from 'https';
import { URL } from 'url';

/**
 * Get the image dimensions from a URL
 * @param url The URL to get the image dimensions from
 * @returns {Promise<{width: number, height: number}>} The width and height of the image
 */
const getImageDimensions = async (url: string) => {
    const options = new URL(url);
    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            const chunks = [];
            response
                .on('data', (chunk) => {
                    chunks.push(chunk);
                })
                .on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    resolve(sizeOf(buffer));
                });
        });
    });
}

const config = useRuntimeConfig();
/**
 * Instantiates an Algolia client and returns the Radiolab index.
 * @returns {Promise<algoliasearch.Index>}
 */
const getIndex = async () => {
    const client = await algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    return client.initIndex('radiolab');
};

/**
 * Creates the main image for an episode.
 * @param episode - The episode object.
 * @returns The main image object with URL, width, and height.
 */
const createImageMain = async (episode: any) => {
    const dimensions: any = await getImageDimensions(episode.image_url);
    episode['image-main'] = {
        url: episode.image_url,
        width: dimensions.width,
        height: dimensions.height
    };
    return episode['image-main'];
};

/**
 * Retrieves a batch of episodes from the server.
 * @param page - The page number of the batch to retrieve.
 * @returns An array of episodes.
 * @throws An error if the retrieval fails.
 */
const getBatch = async ( page: number ) => {
    const recent = await axios.get(process.env.SIMPLECAST_URL);
    
    if (recent.status === 200) {
        const episodes = [];
        const collection = recent.data.collection;

        for (let i = 0; i < collection.length; i++) {
            const episode = collection[i];
            const publishTime = new Date(episode.published_at).getTime();
            const imageMain = await createImageMain(episode);
            episodes.push({
                objectID: episode.id,
                slug: episode.slug,
                title: episode.title,
                audio: episode.enclosure_url,
                description: episode.description,
                tease: episode.description,
                publishTime,
                "publish-at": episode.published_at,
                "date-line-ts": episode.updated_at,
                "estimated-duration": episode.duration,
                "image-main": imageMain
            });
        }

        return episodes;
    }
    throw new Error(`Failed to retrieve recent page ${page}`);
};

/**
 * Updates the index with the most recent episodes.
 */
const updateRecent = async () => {
    const episodes = await getBatch(1);
    (await getIndex()).saveObjects(episodes).then(() => {
        //Not doing anything with the response
    }).catch((e) => {
        throw new Error("error", e);
    });
};

/**
 * Indexes all RadioLab episodes.
 */
const indexAll = async () => {
    let pageNum = 1;
    const episodes = [];
    let page = await getBatch(pageNum);
    while (page.length > 0) {
        episodes.push(...page);
        page = await getBatch(pageNum++);
    }
    (await getIndex()).replaceAllObjects(episodes).then(() => {
        //Not doing anything with the response
    }).catch((e) => {
        throw new Error("Error rebuilding index", { cause: e });
    });
};

/**
 * Validates the token
 * @param token The token to validate
 * @returns {boolean} true if the token is valid, false otherwise
 */
const validateToken = (token: string): boolean => {
    const validToken = process.env.VALID_TOKEN;
    return token === validToken;
};

/**
 * Gets the header from the event
 * @param event The event to get the header from
 * @param header The header to get
 * @returns {JSON} Status and body
 */
export default defineEventHandler(async (event) => {
    try {
        // Get the indexType from the event context and call the appropriate function
        const indexType: string | undefined = event?.context?.params?.indexType_index;

        // Validate the token
        const token = getRequestHeader(event,'Authorization').replace('Bearer ', '');
        if (!token || !validateToken(token)) {
            return {status: 401, body: 'Unauthorized'};
        }
        // Call the appropriate function based on the indexType parameter. Options are 'update_index' and 'all_index'
        if (indexType === 'update_index') {
            await updateRecent();
            return {status: 200, body: 'Updated recent episodes'};
        }else if (indexType === 'all_index') {
             await indexAll();
            return {status: 200, body: 'Indexed all episodes'};
        }else{
            return {status: 404, body: 'Not Found'};
        }
    } catch (e) {
        return {status: 500, body: e.message};
    }
});