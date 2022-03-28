import { defineNuxtConfig } from 'nuxt3'

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
  buildModules: ['@vueuse/nuxt'],
  router: {
    // https://router.vuejs.org/api/#routeroptions
    // NEED NEWER VERSION OF NUXT3 to use the following, to solve the page position on route change
    /* options: {
      scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
    } */
  },
  css: [
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/radiolab.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'mosha-vue-toastify/dist/style.css',
    /* '~/assets/scss/global.scss', */
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/variables.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/radiolab/_mixins.scss"; @import "~/assets/scss/global.scss";`,
        },
      },
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
    SENTRY_DSN: process.env['SENTRY_DSN'],
    ENV: process.env['ENV']
  }
})