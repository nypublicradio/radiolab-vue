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

export const copyToClipBoard = async (content) => {

  await navigator.clipboard.writeText(content)
    .then(() => {
      return true
    })
    .catch(err => {
      return false
    })
}


// social share
const URL_PLACEHOLDER_PATTERN = new RegExp('%URL%', 'g')
const SOCIAL_SERVICE_MAP = {
  facebook: {
    profileBase: 'https://www.facebook.com/',
    shareBase: 'https://www.facebook.com/sharer.php',
    urlKey: 'u'
  },
  twitter: {
    profileBase: 'https://twitter.com/',
    shareBase: 'https://twitter.com/intent/tweet'
  }
}
const shareUrl = computed(() => {
  const utmParams = Object.entries(props.utmParameters).map(
    ([key, value]) => {
      return 'utm_' + key + '=' + encodeURIComponent(value)
    }
  )
  let url = props.url
  if (utmParams.length > 0) {
    url = url + '?' + utmParams.join('&')
  }

  const shareParams = Object.entries(props.shareParameters).map(
    ([key, value]) => {
      return (
        key +
        '=' +
        encodeURIComponent(value.replace(URL_PLACEHOLDER_PATTERN, url))
      )
    }
  )

  let params = shareParams

  const shouldOmitUrl = SOCIAL_SERVICE_MAP[props.service]?.omitUrl
  if (!shouldOmitUrl) {
    const urlKey = SOCIAL_SERVICE_MAP[props.service]?.urlKey || 'url'
    const urlParam = urlKey + '=' + encodeURIComponent(url)
    params = [urlParam, ...params]
  }

  return shareBase.value + '?' + params.join('&')
})
export const share = (service) => {
  // const shareBase = () => {
  //     return SOCIAL_SERVICE_MAP[service]?.shareBase || ''
  // }
  if (!service) {
    return
  }

  // get the position of the popup window   
  function getPopupPosition() {
    const screenLeft = screen.availLeft
    const screenTop = screen.availTop

    const windowWidth = screen.availWidth
    const windowheight = screen.availHeight

    const left = windowWidth / 2 - 600 / 2 + screenLeft
    const top = windowheight / 2 - 600 / 2 + screenTop

    return { left: left, top: top }
  }

  // get the position of the window
  const windowString = ({ top, left }) =>
    `location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=550,height=600,top=${top},left=${left}`
  const popupPosition = getPopupPosition()
  const newWindow = window.open(
    shareUrl,
    'share window',
    windowString(popupPosition)
  )

  // make sure it actually opened and bring it to the front
  if (
    typeof newWindow !== 'undefined' &&
    newWindow !== null &&
    newWindow.focus
  ) {
    newWindow.focus()
  }
}