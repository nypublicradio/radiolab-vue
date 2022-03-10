export const colorModes = {
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

export const useColorMode = () => useState<string>('colorMode', () => colorModes.DEFAULT)
export const usePlayPreference = () => useState<string>('playPreference', () => playPreferences.SITE)
export const useHeaderMenu = () => useState('headerMenu', () => [
  {
    label: 'Podcasts',
    items: [
      {
        label: 'Podcasts Episodes',
        to: '/news',
      },
      {
        label: 'On The Radio',
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
        label: 'Read the Credits',
        to: '/news',
      },
      {
        label: 'Contact us',
        to: '/news',
      }
    ]
  },
  {
    label: 'For listeners',
    items: [
      {
        label: 'Join The Lab',
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
    class: 'gap',
  },
  {
    label: 'Become a member',
    to: '/news',
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