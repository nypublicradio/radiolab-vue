# Radiolab Web Client

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expect node version `14.19.0`.

```bash
npm install
npm i nuxt3@3.0.0-27439932.78761c2
```

^ we are using this version of NUXT3 till the release candidate!

## Development

Start the development server on `http://localhost:3000`

```bash
npm dev
```

## Production

Build the application for production:

```bash
docker build -t radiolab-vue .
docker run radiolab-vue -p 3000:3000
```
