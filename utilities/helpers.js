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
export const copyToClipBoard = async (content) => {

  await navigator.clipboard.writeText(content)
    .then(() => {
      return true
    })
    .catch(() => {
      //(err)
      return false
    })
}

// global function for getting and overridding toast notification configuation 
export const toastGlobalConfig = (optionsObj) => {
  // is it null or undefined
  optionsObj ??= {}

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