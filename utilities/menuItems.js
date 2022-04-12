/**
 * Global state for the menu
 */
export default [
  {
    label: 'Podcasts',
    items: [
      {
        label: 'Episodes',
        to: '/episodes',
      },
      {
        label: 'Radio Shows',
        to: '/radio-shows',
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
        to: '/new-cohosts-latif-nasser-lulu-miller',
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
        to: '/radiolab-read-credit',
      },
      {
        label: 'Swag Lab',
        url: 'https://shop.radiolab.org',
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
    to: '/the-lab',
    class: 'button alone',
  },
  {
    label: 'FAQs',
    visible: false,
    to: 'https://wnycstudios.zendesk.com/hc/en-us/categories/115002261607-FAQ-s',
  },
  {
    label: 'Sponsorship',
    visible: false,
    to: 'https://sponsorship.wnyc.org/',
  },
  {
    label: 'Diversity (DEI)',
    visible: false,
    to: 'https://www.nypublicradio.org/diversity-dei-overview/',
  },
  {
    label: 'Listener Panel',
    visible: false,
    to: 'https://www.wnycstudios.org/listener-panel',
  },
  {
    label: 'Terms of Use',
    visible: false,
    to: 'https://www.wnyc.org/terms/',
  },
  {
    label: 'Privacy Policy',
    visible: false,
    to: 'https://www.wnyc.org/privacy/',
  },
  {
    label: 'Accessibility',
    visible: false,
    to: 'https://media.wnyc.org/media/resources/2021/Jul/07/accessibility_policy_10.30.20.pdf',
  },
]