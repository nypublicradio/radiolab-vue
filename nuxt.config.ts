import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  //buildModules: ['nypr-design-system-vue3/nuxt'],
  css: [
    //'primevue/resources/themes/saga-blue/theme.css',
    // 'nypr-design-system-vue3/src/assets/library/primeflex.min.css',
    'nypr-design-system-vue3/src/assets/themes/white-label/white-label.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
            additionalData: `@import "nypr-design-system-vue3/src/assets/themes/white-label/variables.scss"; @import "nypr-design-system-vue3/src/assets/themes/white-label/_mixins.scss";`,
        },
      },
    },
/*     resolve: {
        dedupe: ['vue']
    }, */
  },
  components: true,
})