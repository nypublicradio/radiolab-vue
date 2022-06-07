# Radiolab Web Client

## IMPORTANT
if you get this error, or any other error:
"nuxi requires @nuxt/kit to be installed in your project. Try installing nuxt3 or @nuxt/bridge"

first run this install to fix it:
```bash
npm i nuxt@3.0.0-rc.3
```

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expects 
node version `16.14.2`
npm version 8.6.0

to install the npm version, run the following
npm install npm@8.6.0 -g

```bash
npm install
npm i nuxt@3.0.0-rc.3
```

For more info on the nuxt release candidates see https://github.com/nuxt/framework/releases

in VS Code, use the following plugin for formatting. Be sure to install the older version 0.33.10:
https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

## Development

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

To avoid a CORS error, open a new Chrome window from the terminal with web security disabled:

Mac OS
```bash
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
```

Windows cmd prompt
```bash
cd c:\Program Files\Google\Chrome\Application
chrome.exe --disable-web-security --user-data-dir=c:\my-chrome-data\data --new-window http://localhost:3000/
```
You can create a .bat file as well:
```bash
cd "C:\Program Files\Google\Chrome\Application\"
start chrome.exe --disable-web-security --user-data-dir=c:\my-chrome-data\data --new-window http://localhost:3000/

```


## Production

Build the application for production:

```bash
docker build -t radiolab-vue .
docker run -p 3000:3000 -e HOST=0.0.0.0 radiolab-vue -e API_URL=https://api.demo2.wnyc.net
```

## Search Index

Keyword search and archive filtering is driven by the [Algolia](https://algolia.com/dashboard) search engine. Credentials for Algolia are in 1Password. Log in to the dashboard to view the indices (one for demo and one prod) as well as to retrieve the API keys and application ID that will need to be set in the `.env` file. There is only one set of API credentials for both demo and prod, so make sure the index name is set appropriately. The indexer fetches episode data from the Publisher API and sends it to Algolia. There are two options, one to do an update of the 10 most recent episodes another to rebuild the index from scratch. The refresh of recent episode is available via URL at `/update-index` and is invoked nightly via Zapier. The update and full rebuild are also available as command-line options:

`npm run updateIndex`

`npm run rebuildIndex`