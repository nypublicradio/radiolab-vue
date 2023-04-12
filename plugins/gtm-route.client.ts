export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-test', (route: { name: string; params: { slug: string; } }) => {
        console.log("route = ", route)
        const { $analytics } = useNuxtApp()
        const excludedList = ['podcast-slug']
        if (excludedList.indexOf(route.name) === -1) {
            $analytics.sendPageView({ page_type: route.name, page_slug: route.params.slug })
        }
    }, { global: true })
})