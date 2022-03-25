export const styleModes = {
    DEFAULT: 'default',
    DARK: 'dark',
}
/**
 * Global state for possible dark mode
 */
export const useColorMode = () => useState<string>('colorMode', () => styleModes.DEFAULT)

const playServices = [
  { name: 'Listen', icon: 'site', url:'' },
  { name: 'Apple Podcasts', icon: 'apple', url: 'https://itunes.apple.com/us/podcast/radiolab/id152249110?mt=2' },
  { name: 'Spotify', icon: 'spotify', url: 'https://open.spotify.com/show/2hmkzUtix0qTqvtpPcMzEL' },
  { name: 'Overcast', icon: 'overcast', url: '' },
  { name: 'Stitcher', icon: 'stitcher', url: 'https://www.stitcher.com/podcast/wnycs-radiolab' },
  { name: 'NPR One', icon: 'nprone', url: '' },
  { name: 'Google Podcasts', icon: 'google', url: 'https://podcasts.google.com/feed/aHR0cDovL2ZlZWRzLndueWMub3JnL3JhZGlvbGFi' },
  { name: 'Castbox', icon: 'castbox', url: 'https://castbox.fm/channel/Radiolab-id129730?country=us' },
  { name: 'Amazon Music', icon: 'amazon', url: 'https://music.amazon.com/podcasts/779c24b4-dfe8-497a-83bb-67e729c1177b/Radiolab' },
  { name: 'Pocket Cast', icon: 'pocketcast', url: 'https://pca.st/radiolab' },
  { name: 'Podcast Addict', icon: 'podcastaddict', url: 'https://podcastaddict.com/podcast/191' },
  { name: 'RSS', icon: 'rss', url:'http://feeds.wnyc.org/radiolab' }
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
        to: '/episodes',
      },
      {
        label: 'Radio Shows',
        to: '/news',
      },
      {
        label: 'Series',
        to: '/series',
      },
      {
        label: 'Radiolab for Kids',
        to: '/radiolab-kids',
      }
    ]
  },
  {
    label: 'About',
    items: [
      {
        label: 'About the Show',
        to: '/about',
      },
      {
        label: 'Team',
        to: '/team',
      },
      {
        label: 'Announcements',
        to: '/news',
      },
      {
        label: 'Pitch Us',
        to: '/pitch-us',
      }
    ]
  },
  {
    label: 'For Listeners',
    items: [
      {
        label: 'The Lab',
        to: '/the-lab',
      },
      {
        label: 'Read the credits',
        to: '/read-the-credits',
      },
      {
        label: 'Swag Lab',
        to: '/news',
      }
    ]
  },
  {
    label: 'How to listen',
    to: '/how-to-listen',
    class: 'gap alone',
  },
  {
    label: 'Become a member',
    to: '/become-a-member',
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