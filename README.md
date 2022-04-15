# Radiolab Web Client

## IMPORTANT
if you get this error, or any other error:
"nuxi requires @nuxt/kit to be installed in your project. Try installing nuxt3 or @nuxt/bridge"

first run this install to fix it:
```bash
npm i nuxt3@3.0.0-27491748.3186841
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
npm i nuxt3@3.0.0-27491748.3186841
```

^ we are using this version of NUXT3 till the release candidate! 

## Development

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
docker build -t radiolab-vue .
docker run -p 3000:3000 -e HOST=0.0.0.0 radiolab-vue -e API_URL=api.publisher.demo.nypr.digital
```
