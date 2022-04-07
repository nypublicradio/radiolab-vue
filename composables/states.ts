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
