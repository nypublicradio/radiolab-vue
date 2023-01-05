import { createToast } from 'mosha-vue-toastify'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
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
// fyi, This feature is available only in secure contexts (HTTPS), etc... testing local will have no result on mobile, using browserstack works for andriod-chrome only... Best to just test it on the DEMO link.
export const shareAPI = async (content, msg) => {
  if (navigator.canShare && isMobileBrowser()) {
    await navigator.share(content)
  } else {
    copyToClipBoard(content.url, msg)
  }
}

// helper function that determins if an element is in the viewport by a certain percentage
// export const isElementXPercentInViewport = function (el, percentVisible) {
//   const
//     rect = el.getBoundingClientRect(),
//     windowHeight = (window.innerHeight || document.documentElement.clientHeight)

//   return !(
//     Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / Number(-rect.height)) * 100)) < percentVisible ||
//     Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
//   )
// }

// checks window width up against the breakpoints and returns the requested mobile or desktop size
export const bpSizes = (bp, m, d) => {
  if (typeof window === 'undefined') return d
  return window.innerWidth < breakpoint[bp] ? m : d
}


/*
takes the prop path and returns the desired data from the response
*/
export const traverseObjectByString = (pathString, data) => {
  let tempData = data
  const pathParts = pathString.split('.')
  pathParts.forEach((key) => {
    tempData = tempData[key]
    if (tempData === undefined || tempData === null) {
      throw new Error(`path prop wrong format`)
    }
  })
  return tempData
}

/*
takes html and converts to plain text
*/
export const convertHTMLtoPlainText = (html) => {
  var tempDivElement = document.createElement('div')
  tempDivElement.innerHTML = html
  return tempDivElement.textContent || tempDivElement.innerText || ''
}