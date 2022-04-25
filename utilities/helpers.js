import { createToast } from 'mosha-vue-toastify'

/*basic function that detects if the site is running in a mobile browser*/
function isMobileBrowser() {
  return (typeof window.orientation !== "undefined")
    || (navigator.userAgent.indexOf('IEMobile') !== -1
    )
};

// global function for getting and overridding toast notification configuation 
export const toastGlobalConfig = (optionsObj = {}) => {

  return {
    timeout: 6000,
    position: 'bottom-center',
    hideProgressBar: true,
    showIcon: true,
    type: 'default',
    transition: 'slide',
    ...optionsObj
  }
}
const toastConfig = toastGlobalConfig()
const toastConfigDanger = toastGlobalConfig({ type: 'danger' })

// formats a date in the format of ShortMonthName DD, YYYY
export const formatDate = function (date) {
  const formattedDate = new Date(date)
  const day = formattedDate.getDate()
  const month = formattedDate.toLocaleString('default', { month: 'short' })
  const year = formattedDate.getFullYear()
  return `${month} ${day}, ${year}`
}

// format the url of a publisher image so it works with our design system components
export const publisherImageFormatter = (url) => {
  // console.log('url = ', url)
  // console.log('url = ', url.replace("%s/%s/%s/%s", "%width%/%height%/c/%quality%"))
  return url.replace("%s/%s/%s/%s", "%width%/%height%/c/%quality%")

}

// global funcrtion for copying to clipboard
export const copyToClipBoard = async (content, msg) => {
  await navigator.clipboard.writeText(content)
    .then(() => {
      createToast(msg ? msg : 'Copied to the clipboard', toastConfig)
    })
    .catch(() => {
      //(err)
      createToast({ title: 'Copy to clipboard failed', description: 'Try again another time' }, toastConfigDanger)
    })
}

// global funcrtion for shareApi and copyToClipboard fallback
// fyi, This feature is available only in secure contexts (HTTPS), etc... testing local will have no result on mobile, using browserstack works for andriod only... Best to just test it on the DEMO link.
export const shareAPI = async (content, msg) => {

  if (navigator.share && isMobileBrowser()) {
    await navigator.share(content)
      // .then(() => {

      // })
      .catch(() => {
        copyToClipBoard(content.url, msg)
      })
  } else {
    copyToClipBoard(content.url, msg)
  }
}

