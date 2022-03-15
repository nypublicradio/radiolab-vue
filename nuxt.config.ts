import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  //buildModules: ['nypr-design-system-vue3/nuxt'],
  css: [
    //'primevue/resources/themes/saga-blue/theme.css',
    // 'nypr-design-system-vue3/src/assets/library/primeflex.min.css',
    'nypr-design-system-vue3/src/assets/themes/radiolab/radiolab.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '~/assets/scss/global.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "nypr-design-system-vue3/src/assets/themes/radiolab/variables.scss"; @import "nypr-design-system-vue3/src/assets/themes/radiolab/_mixins.scss";`,
        },
      },
    },
  },
  components: true,
  build: {
    transpile: [
      'primevue'
    ]
  },
  publicRuntimeConfig: {
    SENTRY_DSN: process.env['SENTRY_DSN'],
    ENV: process.env['ENV']
  }
})