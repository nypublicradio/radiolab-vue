import express from 'express';
const app = express();
import axios from 'axios';
import algoliasearch from 'algoliasearch';
require('dotenv').config();

const client = algoliasearch(process.env['ALGOLIA_APP_ID'], process.env['ALGOLIA_ADMIN_API_KEY']);
const index = client.initIndex(process.env['ALGOLIA_RADIOLAB_INDEX']);

async function updateRecent() {
    const episodes = await getBatch(1);
    index.saveObjects(episodes).then((ids) => {
        console.log("saved", ids);
    }).catch((e) => {
        console.log("error", e);
    });
}

async function reIndexAll() {
    let pageNum = 1;
    const episodes = [];
    let page = await getBatch(pageNum);
    while (page.length > 0) {
        console.log(page.length, "eps for page", pageNum);
        episodes.push(...page);
        page = await getBatch(pageNum++);
    }
    console.log("Got", episodes.length, " episodes, replacing index");
    index.replaceAllObjects(episodes).then((ids) => {
        console.log("saved", ids.length);
    }).catch((e) => {
        console.log("error", e);
    });
}

async function getBatch(page) {
    const recent = await axios.get(`${process.env['API_URL']}/api/v3/channel/shows/radiolab/recent_stories/${page}`);
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
                    publishTime: publishTime,
                    "publish-at": episode.attributes["publish-at"],
                    "date-line-ts": episode.attributes["date-line-ts"],
                    "estimated-duration": episode.attributes["estimated-duration"],
                    "image-main": episode.attributes["image-main"]
                };
            })
        return episodes;
    } else {
        console.log("Failed to retrieve page", page);
    }
}

// CLI interface
export function cli() {
    const task = process.argv.pop();
    if (task === 'rebuild-index') {
        console.log("Rebuilding complete index...");
        reIndexAll();
    } else if (task === 'update-recent') {
        console.log("Indexing most recent episodes...");
        updateRecent();
    } else {
        console.error("Unknown task", task);
    }
}

// API endpoint
app.get('/update-index', (req, res) => {
    updateRecent();
    res.send("OK");
});

export default app;