# Radiolab Web Client
### Nuxt 3 & NODE version 14.7.0 

We recommend to look at the [Nuxt 3 documentation](https://v3.nuxtjs.org).

## Setup

This project expect node version `14.19.0`.

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`

```bash
npm dev
```

## Production

Build the application for production:

```bash
docker build -t radiolab-vue .
docker run -p 3000:3000 -e NUXT_HOST=0.0.0.0 radiolab-vue
```
