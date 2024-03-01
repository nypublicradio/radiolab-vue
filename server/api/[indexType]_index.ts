import axios from 'axios';
import algoliasearch from 'algoliasearch';

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
 * Fetches episodes from publisher's API and returns them in a format suitable for indexing.
 * @param page Page number to fetch
 * @returns episode data to be indexed
 */
const getBatch = async ( page: number ) => {
    const recent = await axios.get(`${config.public.API_URL}/api/v3/channel/shows/radiolab/recent_stories/${page}`);
    if (recent.status === 200) {
        const episodes = recent.data.included
        .filter(episode => episode.attributes["audio-may-download"]) // filter out episodes that don't have audio
        .map(episode => {
            const publishTime = new Date(episode.attributes["publish-at"]).getTime();
            return {
                objectID: episode.attributes["cms-pk"], // Algolia's unique identifier
                slug: episode.attributes.slug,
                title: episode.attributes.title,
                audio: episode.attributes.audio,
                description: episode.attributes.body,
                tease: episode.attributes.tease,
                publishTime,
                "publish-at": episode.attributes["publish-at"],
                "date-line-ts": episode.attributes["date-line-ts"],
                "estimated-duration": episode.attributes["estimated-duration"],
                "image-main": episode.attributes["image-main"]
            };
        })
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