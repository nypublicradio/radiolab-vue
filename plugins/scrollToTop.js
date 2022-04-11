import { defineNuxtPlugin } from '#app'
// this will always bring the user to the top of the page. Nuxt3 will hopfully have a better solution soon for this where we can use saved positions when going back etc...
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        //setTimeout(() => {
        window.scrollTo(0, 0)
        //}, 300)
    })
})