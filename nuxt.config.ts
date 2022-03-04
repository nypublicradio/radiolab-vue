import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: [],
  css: [
    //'primevue/resources/themes/saga-blue/theme.css',
    // 'assets/theme/white-paper.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'nypr-design-system-vue3/src/assets/library/primeflex.min.css'
  ],
  // ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "~/src/assets/library/primeflex.min.css"; @import "~/src/assets/themes/white-paper/_theme.scss"; @import "primevue/resources/primevue.min.css"; @import "primeicons/primeicons.css";`,
          additionalData: `@import "nypr-design-system-vue3/src/assets/themes/white-paper/_theme.scss";`,
        },
      },
    },
  },
  components: [
    '~/components',
    // { path: '~/node_modules/nypr-design-system-vue3/v2/src/components/', extensions: ['vue'] }
  ],
})