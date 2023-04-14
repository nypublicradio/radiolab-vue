export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-ga-page-view', (route: { name: string; params: { slug: string; } }) => {
        const { $analytics } = useNuxtApp()
        const excludedList = ['podcast-slug']
        if (excludedList.indexOf(route.name) === -1) {
            $analytics.sendPageView({ page_type: route.name, page_slug: route.params.slug })
        }
    }, { global: true })
})