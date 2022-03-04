import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: [],
  css: [
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
          //additionalData: `@import "storybook-vue/src/assets/themes/white-paper/_theme.scss";`,
        },
      },
    },
  },
  components: [
    '~/components',
    // '~/node_modules/storybook-vue/src/v2/src/components',
    // { path: '~/node_modules/storybook-vue/v2/src/components/', extensions: ['vue'] }
  ],
})