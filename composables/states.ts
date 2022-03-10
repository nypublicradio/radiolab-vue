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
        label: 'Episodes',
        to: '/news',
      },
      {
        label: 'Radio Shows',
      },
      {
        label: 'Projects',
      },
      {
        label: 'Radiolab for Kids',
      }
    ]
  },
  {
    label: 'About',
    items: [
      {
        label: 'About the Show',
      },
      {
        label: 'Team',
      },
      {
        label: 'Announcements',
      },
      {
        label: 'Read the Credits',
      },
      {
        label: 'Pitch us',
      }
    ]
  },
  {
    label: 'For listeners',
    items: [
      {
        label: 'The Lab',
      },
      {
        label: 'Read the Credits',
      },
      {
        label: 'Merch Store',
      }
    ]
  },
  {
    label: 'How to listen',
    class: 'gap',
  },
  {
    label: 'Become a member',
  }
])