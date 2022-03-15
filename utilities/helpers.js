export const formatDate = function (date) {
    const formattedDate = new Date( date )
    const day = formattedDate.getDate()
    const month = formattedDate.toLocaleString( 'default', { month: 'short' } )
    const year = formattedDate.getFullYear()
    return `${ month } ${ day }, ${ year }`
}