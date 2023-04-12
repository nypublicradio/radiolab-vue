export default defineNuxtPlugin(() => {
    const { $analytics } = useNuxtApp()
    addRouteMiddleware('global-test', (route) => {
        console.log('this global middleware was added in a plugin and will be run on every route change')
        //console.log('$analytics = ', $analytics)
        console.log('route = ', route)
        //const excludedList = ['podcast-slug']
        //if (excludedList.indexOf(route.name) === -1) {
        setTimeout(() => {
            $analytics.sendPageView({ page_type: route.name, page_slug: route.params.slug })
        }, 2000)
        //}

    }, { global: true })
})