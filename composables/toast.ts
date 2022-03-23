// global config for toast notifications, styles can be found in the globals.scss
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