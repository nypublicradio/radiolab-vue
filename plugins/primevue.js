import { defineNuxtPlugin } from '#app'
import Button from 'primevue/button/button.esm.js'
import InputText from 'primevue/inputtext/inputtext.esm.js'
import Image from 'primevue/image/image.esm.js'
import InputSwitch from 'primevue/inputswitch/inputswitch.esm.js'
import Menubar from 'primevue/menubar/menubar.esm.js';
import Menu from 'primevue/menu/menu.esm.js';
import PrimeVue from 'primevue/config/config.esm.js'
import MegaMenu from 'primevue/megamenu/megamenu.esm.js';
import Dropdown from 'primevue/dropdown/dropdown.esm.js';
import Toast from 'primevue/toast/toast.esm.js';
import ToastService from 'primevue/toastservice/toastservice.esm.js';
// import Tag from "primevue/tag"
// import Menubar from 'primevue/menubar';
// import InputText from 'primevue/inputText';
// import Breadcrumb from 'primevue/breadcrumb';
// import MegaMenu from 'primevue/megamenu';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Image', Image)
    nuxtApp.vueApp.component('InputSwitch', InputSwitch)
    nuxtApp.vueApp.component('Menubar', Menubar)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('MegaMenu', MegaMenu)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('ToastService', ToastService)
    // nuxtApp.vueApp.component('Tag', Tag)
    // nuxtApp.vueApp.component('Menubar', Menubar)
    // nuxtApp.vueApp.component('InputText', InputText)
    // nuxtApp.vueApp.component('Breadcrumb', Breadcrumb)
    //other components that you need
})