import axios from 'axios';
import algoliasearch from 'algoliasearch';

const config = useRuntimeConfig();

const getIndex = async () => {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    return client.initIndex('radiolab');
};

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

const updateRecent = async () => {
    const episodes = await getBatch(1);
    (await getIndex()).saveObjects(episodes).then(() => {
    }).catch((e) => {
        throw new Error("error", e);
    });
};

const indexAll = async () => {
    let pageNum = 1;
    const episodes = [];
    let page = await getBatch(pageNum);
    while (page.length > 0) {
        episodes.push(...page);
        page = await getBatch(pageNum++);
    }
    (await getIndex()).replaceAllObjects(episodes).then(() => {
    }).catch((e) => {
        throw new Error("Error rebuilding index", { cause: e });
    });
};

const validateToken = (token: string): boolean => {
    const validToken = process.env.VALID_TOKEN;
    return token === validToken;
};

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
            const callUpdate = await updateRecent();
            return {status: 200, body: 'Updated recent episodes'};
        }else if (indexType === 'all_index') {
            const callIndex = await indexAll();
            return {status: 200, body: 'Indexed all episodes'};
        }else{
            return {status: 404, body: 'Not Found'};
        }
    } catch (e) {
        return {status: 500, body: 'Internal Server Error'};
    }
});