const redirects =
  [
    { from: '/episodes', to: '/podcast' },
    { from: '/radio-shows', to: '/on-the-radio' }
  ]

export default fromNodeMiddleware((req, res, next) => {
  const url = req.url.split('?')[0]
  let urlParams = null
  if (req.url.includes('?')) {
    urlParams = `?${req.url.split('?')[1]}`
  }

  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    let newLocation
    if (urlParams) {
      newLocation = redirect.to + urlParams
    } else {
      newLocation = redirect.to
    }
    res.writeHead(301, {
      Location: newLocation
    })
    res.end()
  } else {
    next()
  }
})
