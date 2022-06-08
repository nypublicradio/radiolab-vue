import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#f4f2f0' },
      { name: 'theme-color', content: '#f4f2f0' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' }
    ],
  },
  modules: [
    [
      "@nuxtjs/algolia",
      {
        apiKey: process.env['ALGOLIA_API_KEY'],
        applicationId: process.env['ALGOLIA_APP_ID'],
        //lite: false,
        //instantSearch: false,
        // crawler: {
        //   apiKey: '<YOUR_API_KEY>',
        //   indexName: '<YOUR_INDEX_NAME>',
        //   meta: ['title', 'description'],
        //   include: () => true
        // },
        //recommend: true
      },
    ],
  ],
  css: [
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/radiolab.min.css',
    '@nypublicradio/nypr-design-system-vue3/src/assets/styles/flags.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'mosha-vue-toastify/dist/style.css',
  ],
  serverMiddleware: ['~/search/algolia-index'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // besure to mirror theses imports in the vitest.config.ts
          additionalData: `@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/variables.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/_mixins.scss"; @import "~/assets/scss/global.scss";`,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
  },
  components: true,
  build: {
    transpile: [
      'primevue',
      'mosha-vue-toastify'
    ]
  },
  publicRuntimeConfig: {
    ALGOLIA_APP_ID: process.env['ALGOLIA_APP_ID'],
    ALGOLIA_API_KEY: process.env['ALGOLIA_API_KEY'],
    ALGOLIA_ADMIN_API_KEY: process.env['ALGOLIA_ADMIN_API_KEY'],
    ALGOLIA_RADIOLAB_INDEX: process.env['ALGOLIA_RADIOLAB_INDEX'],
    SENTRY_DSN: process.env['SENTRY_DSN'],
    ENV: process.env['ENV'],
    HTL_CSS: process.env['HTL_CSS'] || 'https://htlbid.com/stage/v3/radiolab.com/htlbid.css',
    HTL_JS: process.env['HTL_JS'] || 'https://htlbid.com/stage/v3/radiolab.com/htlbid.js',
    HTL_IS_TESTING: process.env['HTL_IS_TESTING'] || 'yes',
    API_URL: process.env['API_URL'] || "https://api.wnyc.org"
  }
})