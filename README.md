# Radiolab Web Client

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expects 
node version `16.14.2`
npm version 8.6.0

to install the npm version, run the following
npm install npm@8.6.0 -g

```bash
npm install
```

For more info on the nuxt release candidates see https://github.com/nuxt/framework/releases

in VS Code, use the following plugin for formatting. Be sure to install the older version 0.33.10:
https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

## Create .env and .npmrc files

```bash
cp .env.sample .env
cp .npmrc.sample .npmrc
```

You will need to update the newly created .npmrc file and add your own personal access token at the end of line 2. You can create one in github under settings -> developer settings -> personal access tokens

## Development

Start the development server on `http://local.dev.nypr.digital:3000`

```bash
npm run dev
```

To avoid a CORS error, be sure to replace `localhost:3000` with `local.dev.nypr.digital:3000`


## Production

Build the application for production:

```bash
docker build -t radiolab-vue .
docker run -p 3000:3000 -e HOST=0.0.0.0 radiolab-vue -e API_URL=https://api.demo2.wnyc.net
```

## Review Apps (Ephemeral Environments)

This project includes a GitHub Actions workflow that automatically creates temporary review environments for pull requests using Fly.io. These ephemeral environments allow you to preview and test changes before merging.

### How it works

- **Automatic deployment**: When you open, update, or reopen a pull request, a review app is automatically deployed
- **Unique URLs**: Each PR gets its own unique URL at `https://pr-{PR_NUMBER}-nypublicradio-{REPO}.fly.dev`
- **Live updates**: The review app updates automatically when you push new commits to the PR
- **Automatic cleanup**: The review environment is automatically destroyed when the PR is closed or merged

### Features

- Uses a separate Dockerfile (`Dockerfile_pr`) optimized for review environments
- Includes all necessary environment variables and secrets
- Supports private GitHub packages via automated `.npmrc` configuration
- Auto-scaling with cost optimization (machines auto-stop when not in use)

### Requirements

The following secrets and environment variables must be configured in the GitHub repository settings:

**Secrets:**

- `FLY_API_TOKEN` - Fly.io API token for deployments
- `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_ADMIN_API_KEY` - Algolia search credentials
- `GA_MEASUREMENT_ID`, `GTM_ID` - Analytics tracking IDs
- `SENTRY_DSN` - Error tracking configuration
- `VALID_TOKEN` - API authentication token

**Environment Variables:**

- `ENV`, `API_URL`, `ALGOLIA_RADIOLAB_INDEX` - Environment configuration
- `HTL_IS_TESTING`, `HTL_CSS`, `HTL_JS` - Feature flags and asset URLs
- `ADMIN_CMS_ROOT`, `SIMPLECAST_URL` - CMS and podcast feed URLs

## Search Index

Keyword search and archive filtering is driven by the [Algolia](https://algolia.com/dashboard) search engine. Credentials for Algolia are in 1Password. Log in to the dashboard to view the indices (one for demo and one prod) as well as to retrieve the API keys, application ID and index name that will need to be set in the `.env` file. There is only one set of API credentials for both demo and prod, so make sure the index name is set appropriately (radiolab and Radiolab Demo). The indexer fetches episode data from the Simplecast API and sends it to Algolia. There are two options, one to do an update of the 10 most recent episodes another to rebuild the index from scratch. The refresh of recent episode is available via URL at `/api/update_index` and the full rebuild is available at `/api/all_index`. The full rebuild is only necessary if the index is corrupted or if the index is being moved to a new Algolia account. The update index is run from Zapier and triggered to run by a change in the Simplecast RSS feed for Radiolab. A token is needed to trigger both the update and all index, this is also in 1Password.