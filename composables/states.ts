export const styleModes = {
    DEFAULT: 'default',
    DARK: 'dark',
}
/**
 * Global state for possible dark mode
 */
export const useColorMode = () => useState<string>('colorMode', () => styleModes.DEFAULT)

const playServices = [
  { name: 'Play on our site', icon: 'site' },
  { name: 'Apple Podcasts', icon: 'apple' },
  { name: 'Spotify', icon: 'spotify' },
  { name: 'Overcast', icon: 'overcast' },
  { name: 'Stitcher', icon: 'stitcher' },
  { name: 'NPR One', icon: 'nprone' },
  { name: 'Google Podcasts', icon: 'google' },
  { name: 'Castbox', icon: 'castbox' },
  { name: 'Amazon Music', icon: 'amazon' },
  { name: 'Pocket Cast', icon: 'pocketcast' },
  { name: 'Podcast Addict', icon: 'podcastaddict' },
  { name: 'RSS', icon: 'rss' }
]
/**
 * Global state for media selection options.
 */
export const usePlayServices = () => useState('playServices', () => playServices )
/**
 * Global state for the users media selection preference. This will stored in local storage
 */
export const usePlayServicePreference = () => useState('playServicePreference', () => {
  // if local storage is available, use it
  if (window.localStorage.getItem('selectedPlayService')) {    
    return JSON.parse(window.localStorage.getItem('selectedPlayService'))
  } else {
    // default to play on site
    return playServices[0]
  }
})


/**
 * Global state for the menu
 */
export const useHeaderMenu = () => useState('headerMenu', () => [
  {
    label: 'Podcasts',
    items: [
      {
        label: 'Episodes',
        to: '/news',
      },
      {
        label: 'Radio Shows',
        to: '/news',
      },
      {
        label: 'Series',
        to: '/news',
      },
      {
        label: 'Radiolab for Kids',
        to: '/news',
      }
    ]
  },
  {
    label: 'About',
    items: [
      {
        label: 'About the Show',
        to: '/news',
      },
      {
        label: 'Team',
        to: '/news',
      },
      {
        label: 'Announcements',
        to: '/news',
      },
      {
        label: 'Pitch Us',
        to: '/news',
      }
    ]
  },
  {
    label: 'For Listeners',
    items: [
      {
        label: 'The Lab',
        to: '/news',
      },
      {
        label: 'Read the credits',
        to: '/news',
      },
      {
        label: 'Swag Lab',
        to: '/news',
      }
    ]
  },
  {
    label: 'How to listen',
    to: '/news',
    class: 'gap alone',
  },
  {
    label: 'Become a member',
    to: '/news',
    class: 'button alone',
  },
  {
    label: 'FAQs',
    visible: false,
    to: '/news',
  },
  {
    label: 'Sponsorship',
    visible: false,
    to: '/news',
  },
  {
    label: 'Diversity (DEI)',
    visible: false,
    to: '/news',
  },
  {
    label: 'Listener Panel',
    visible: false,
    to: '/news',
  },
  {
    label: 'Terms of Use',
    visible: false,
    to: '/news',
  },
  {
    label: 'Privacy Policy',
    visible: false,
    to: '/news',
  },
  {
    label: 'Accessibility',
    visible: false,
    to: '/news',
  },
])