import { useMembershipStatus } from "~~/composables/states"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const membershipStatus = useMembershipStatus()

  window.dataLayer = window.dataLayer || []
  // init gtag function
  function gtag() { dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('set', 'send_page_view', false)
  gtag('config', config.GA_MEASUREMENT_ID)

  // event to use when sending gtag events
  const sendEvent = (name: string, params: Record<string, string>) => {
    gtag('event', name, params)
  }
  // gtag even for reporting on page views
  const sendPageView = (params: Record<string, string>) => {
    //console.log('params = ', params)
    sendEvent('page_view', {
      page_location: document.location.href,
      page_title: document.title,
      NYPRMember: membershipStatus.value,
      ...params
    })
  }
  return {
    provide: {
      analytics: {
        sendEvent,
        sendPageView
      }
    }
  }
})
