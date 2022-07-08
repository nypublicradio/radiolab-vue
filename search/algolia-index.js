import { Router } from‘ express’
const app = Router()
import axios from 'axios';
import algoliasearch from 'algoliasearch';

// Get the Algolia index object
const getIndex = () => {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
    return client.initIndex('radiolab');
}

// Retrieves one page of episodes from the API and returns them as an array
async function getBatch(page) {
    const recent = await axios.get(`${process.env.API_URL}/api/v3/channel/shows/radiolab/recent_stories/${page}`);
    if (recent.status === 200) {
        const episodes = recent.data.included
            .filter(episode => episode.attributes["audio-may-download"]) // only episodes with audio
            .map(episode => {
                // Algolia requires a posix timestamp to do date sorting
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
    throw new Error(`Failed to retrieve page ${page}`);
}

// Fetch most recent episodes and reindex them
async function updateRecent() {
    const episodes = await getBatch(1);
    getIndex().saveObjects(episodes).then(() => {
        // success
    }).catch((e) => {
        throw new Error("error", e);
    });
}

// Fetch all episodes and replace the entire index
async function reIndexAll() {
    let pageNum = 1;
    const episodes = [];
    let page = await getBatch(pageNum);
    while (page.length > 0) {
        episodes.push(...page);
        page = await getBatch(pageNum++);
    }
    getIndex().replaceAllObjects(episodes).then(() => {
        // success
    }).catch((e) => {
        throw new Error("Error rebuilding index", { cause: e });
    });
}

// CLI interface
export async function cli() {
    require('dotenv').config();
    const task = process.argv.pop();
    if (task === 'rebuild-index') {
        await reIndexAll();
    } else if (task === 'update-recent') {
        await updateRecent();
    } else {
        return `Unknown task ${task}. Valid options are 'rebuild-index' and 'update-recent'`;
    }
    return "Update successful";
}

// API endpoint
app.get('/update-index', (req, res) => {
    updateRecent();
    res.send("OK");
});

export default app;