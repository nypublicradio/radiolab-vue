export default {
  app: {
    head: {
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
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' },
        {
          rel: 'preconnect',
          href: 'https://www.googletagmanager.com',
          crossorigin: ''
        },
        {
          rel: 'preconnect',
          href: 'https://www.google-analytics.com',
          crossorigin: ''
        }
      ],
    }
  },
  modules: [
    [
      "@nuxtjs/algolia",
    ],
  ],
  algolia: {
    apiKey: process.env['ALGOLIA_API_KEY'],
    applicationId: process.env['ALGOLIA_APP_ID'],
  },
  css: [
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/fonts/fonts.css',
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/radiolab.min.css',
    '@nypublicradio/nypr-design-system-vue3/src/assets/styles/flags.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    'mosha-vue-toastify/dist/style.css',
  ],
  serverMiddleware: ['~/search/algolia-index'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // besure to mirror theses imports in the vitest.config.ts
          additionalData: '@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/variables.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/_mixins.scss"; @import "~/assets/scss/global.scss";'
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
  build: {
    transpile: [
      'primevue',
      'mosha-vue-toastify'
    ]
  },
  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env['SENTRY_DSN'],
      ENV: process.env['ENV'],
      HTL_CSS: process.env['HTL_CSS'] || 'https://htlbid.com/stage/v3/radiolab.com/htlbid.css',
      HTL_JS: process.env['HTL_JS'] || 'https://htlbid.com/stage/v3/radiolab.com/htlbid.js',
      HTL_IS_TESTING: process.env['HTL_IS_TESTING'] || 'yes',
      API_URL: process.env['API_URL'] || "https://api.wnyc.org",
      ADMIN_CMS_ROOT: process.env['ADMIN_CMS_ROOT'],
      GA_MEASUREMENT_ID: process.env['GA_MEASUREMENT_ID'] || 'G-T0Q62GL5TY',
      GTM_ID: process.env['GTM_ID'] || 'GTM-312335707',
    }
  },
}