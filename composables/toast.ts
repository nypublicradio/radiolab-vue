import { createToast } from 'mosha-vue-toastify'
export const useToastConfig = () => useState('toastConfig',(message) => {
    const config = {
        timeout: 6000,
        position: 'bottom-center',
        hideProgressBar: true,
        showIcon: true,
        type: 'default',
        transition: 'slide',
    }
    return config
})