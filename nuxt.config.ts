import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ['nypr-design-system-vue3/nuxt'],
  css: [
    //'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'nypr-design-system-vue3/src/assets/library/primeflex.min.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "nypr-design-system-vue3/src/assets/themes/white-paper/_theme.scss"; @import "~/assets/scss/global.scss";`,
        },
      },
    },
  },
  components: true,
})