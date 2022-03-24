// global config for toast notifications, styles can be found in the globals.scss
export const useToastConfig = (type) => {
    // console.log('type', type)
    let config = null
    useState('toastConfig',() => {
        config = {
            timeout: 6000,
            position: 'bottom-center',
            hideProgressBar: true,
            showIcon: true,
            type: type ? type : 'default',
            transition: 'slide',
        }
        console.log('type',type)
    })
    return config
}
