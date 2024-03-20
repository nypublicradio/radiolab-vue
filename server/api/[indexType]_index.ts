import axios from 'axios';
import algoliasearch from 'algoliasearch';
import sizeOf from 'image-size';
import https from 'https';
import { URL } from 'url';
interface Season {
    href: string;
    number: number;
}

interface Episode {
    updated_at: string;
    type: string;
    token: string;
    title: string;
    status: string;
    slug: string;
    season: Season;
    scheduled_for: null | string;
    published_at: string;
    number: number;
    is_hidden: boolean;
    image_url: string;
    image_path: string;
    id: string;
    href: string;
    guid: string;
    feeds: null | string;
    enclosure_url: string;
    duration: number;
    description: string;
    days_since_release: number;
    audio_status: string;
    analytics: null | string;
}

interface Dimensions {
    width: number;
    height: number;
}

/**
 * Get the image dimensions from a URL
 * @param url The URL to get the image dimensions from
 * @returns {Promise<{width: number, height: number}>} The width and height of the image
 */
const getImageDimensions = (url: string) => {
    const options = new URL(url);
    return new Promise((resolve) => {
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

/**
 * Instantiates an Algolia client and returns the Radiolab index.
 * @returns {Promise<algoliasearch.Index>}
 */
const getIndex = async () => {
    const client = await algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    return client.initIndex(process.env.ALGOLIA_RADIOLAB_INDEX);
};

/**
 * Creates the main image for an episode.
 * @param episode - The episode object.
 * @returns The main image object with URL, width, and height.
 */
const createImageMain = async (episode: Episode) => {
    if (!episode?.image_url){
        return null;
    } else {
    const dimensions: Dimensions = await getImageDimensions(episode?.image_url) as Dimensions;
    episode['image-main'] = {
        url: episode.image_url,
        width: dimensions.width,
        height: dimensions.height
    };
    return episode['image-main'];
}
};


/**
 * Retrieves a batch of episodes from Simplecast.
 * @returns {Promise<any>} A promise that resolves to an array of episodes.
 * @throws {Error} If the request to Simplecast fails.
 */
const getBatch = async (url: string) => {
    const response = await axios.get(url);
    
    if (response.status === 200) {
        const episodes: Array<Array<string>> = [];
        const pages = response.data.pages;
        const collection = response.data.collection;
        for (const episode of collection) {
            // Skip if episode is null
            if (!episode) {
                continue;
            }
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
                "date-line-ts": (new Date(episode.updated_at).getTime())/1000,
                "estimated-duration": episode.duration,
                "image-main": imageMain
            });
        }
        episodes.pages = pages;
        return episodes;
    }
    throw new Error(`Failed to retrieve episodes from Simplecast. Status: ${response.status}`);
};

/**
 * Updates the index with the most recent episodes.
 */
const updateRecent = async () => {
    const url = `${process.env.SIMPLECAST_URL}&limit=10`;
    const episodes = await getBatch(url);
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
    // On the first run it will set the next url to null but on subsequent runs it will be set to the next url
    //if the next url is null, we are done
    let url = process.env.SIMPLECAST_URL;
    let episodes = [];
    
    while (url) {
        const batch = await getBatch(url);
        episodes = episodes.concat(batch);
        url = batch.pages?.next?.href;
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
        console.log(e);
        return {status: 500, body: e.message};
    }
});