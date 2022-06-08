// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

// fires a custom google analytics GA4 event
// note: we use gaAction to specify the component name
function gaEvent(gaCategory, gaAction, gaLabel) {
  // event('Event', {
  //   hit_time_stamp: new Date().toISOString(),
  //   component: gaAction,
  //   event_category: gaCategory,
  //   event_label: gaLabel
  // })
}
export default gaEvent