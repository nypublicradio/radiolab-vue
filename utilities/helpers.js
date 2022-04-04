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
  const options = optionsObj ? optionsObj : {}
  return {
    timeout: options.timeout ? options.timeout : 6000,
    position: options.position ? options.position : 'bottom-center',
    hideProgressBar: options.hideProgressBar ? options.hideProgressBar : true,
    showIcon: options.showIcon ? options.showIcon : true,
    type: options.type ? options.type : 'default',
    transition: options.transition ? options.transition : 'slide',
  }
}