import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config"
import Button from "primevue/button"
import InputSwitch from 'primevue/inputswitch';
// import Tag from "primevue/tag"
// import Menubar from 'primevue/menubar';
// import InputText from 'primevue/inputText';
// import Breadcrumb from 'primevue/breadcrumb';
// import MegaMenu from 'primevue/megamenu';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('InputSwitch', InputSwitch)
    // nuxtApp.vueApp.component('Tag', Tag)
    // nuxtApp.vueApp.component('Menubar', Menubar)
    // nuxtApp.vueApp.component('InputText', InputText)
    // nuxtApp.vueApp.component('Breadcrumb', Breadcrumb)
    // nuxtApp.vueApp.component('MegaMenu', MegaMenu)
    //other components that you need
})