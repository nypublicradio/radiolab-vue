import { playServices, lsSelectedPlayService } from '../utilities/constants'
/**
 * Global state for the users media selection preference. This will stored in local storage
 */
export const usePlayServicePreference = () => useState('playServicePreference', () => {
  // if local storage is available, use it
  const localStorage = window.localStorage.getItem(lsSelectedPlayService)
  return localStorage ? JSON.parse(localStorage) : playServices[0]

})
const currentEpisodeObj = null
/**
 * Global state for the current episode object. Will save in local storage in the future
 */
export const useCurrentEpisode = () => useState('useCurrentEpisode', () => currentEpisodeObj)

const isEpisodePlaying = false
/**
 * Global state for the current Howler sound playing.
 */
export const useIsEpisodePlaying = () => useState('useIsEpisodePlaying', () => isEpisodePlaying)

const togglePlayTrigger = false
/**
 * Global state for the current play toggle for player play-toggle prop.
 */
export const useTogglePlayTrigger = () => useState('useTogglePlayTrigger', () => togglePlayTrigger)


/**
 * Global state to track if the user is logged into wnyc CMS
 */
// const getSessionData = () => {
//   const resp = fetch('https://internal.wnyc.org/api/v1/is_logged_in/')
//     .then(response => {
//       return response.json()
//     })
//   console.log('resp = ', resp)
//   return resp
// }
// export const useCmsSession = () => useState('useCmsSession', () => {
//   return getSessionData()
// })



export const useCmsSession = async () => {
  const response = await fetch('https://internal.wnyc.org/api/v1/is_logged_in/').then(response => {
    return response.json()
  })

  return await response
}







// fetch('https://internal.wnyc.org/api/v1/is_logged_in/')
//   .then(async response => {
//     console.log('response = ', response.json())
//     sessionData = response.json()
//   })

