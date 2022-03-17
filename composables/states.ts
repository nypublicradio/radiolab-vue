export const styleModes = {
    DEFAULT: 'default',
    DARK: 'dark',
}

export const playPreferences = {
    SITE: 'site',
    POCKET: 'pocket',
    APPLE: 'apple',
    GOOGLE: 'google',
    TUNEIN: 'tunein',
    STITCHER: 'stitcher',
    SPOTIFY: 'spotify',
    IHEART: 'iheart',
    AMAZON: 'amazon',
    RSS: 'rss',
}
// Apple
// Spotify
// Overcast
// Stitcher
// NPR One
// Google Podcasts
// Castbox
// Amazon Music
// Pocketcasts
// Podcast Addict
// RSS

export const useColorMode = () => useState<string>('colorMode', () => styleModes.DEFAULT)
export const usePlayPreference = () => useState<string>('playPreference', () => playPreferences.SITE)
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