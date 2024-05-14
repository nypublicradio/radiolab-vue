/**
 * Global state for the menu
 */
import { useNuxtApp } from '#app'

export default [{
    label: 'Episodes',
    items: [{
        label: 'Podcast',
        to: '/podcast',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'Podcasts: Episodes',
            })
        }
    },
    {
        label: 'On The Radio',
        to: '/on-the-radio',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'Podcasts: Radio Shows',
            })
        }
    },
    {
        label: 'Series',
        to: '/series',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'Podcasts: Series',
            })
        }
    }
    ]
},
{
    label: 'About',
    items: [{
        label: 'About the Show',
        to: '/about',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'About: About the Show',
            })
        }
    },
    {
        label: 'Team',
        to: '/team',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'About: Team',
            })
        }
    },
    {
        label: 'Announcements',
        to: '/new-cohosts-latif-nasser-lulu-miller',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'About: Announcements',
            })
        }
    },
    {
        label: 'Pitch Us',
        to: '/pitch-us',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'About: Pitch Us',
            })
        }
    }
    ]
},
{
    label: 'Radiolab for Kids',
    to: '/radiolab-kids',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Podcasts: Radiolab for Kids',
        })
    }
},
{
    label: 'For Listeners',
    items: [{
        label: 'The Lab',
        to: '/the-lab',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'For Listeners: The Lab',
            })
        }
    },
    {
        label: 'Read the credits',
        to: '/radiolab-read-credit',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'For Listeners: Read the credits',
            })
        }
    },
    {
        label: 'Newsletter',
        to: '/newsletter',
        command: () => {
            const { $analytics } = useNuxtApp()
            $analytics.sendEvent('click_tracking', {
                event_category: 'Click Tracking',
                component: 'Navigation',
                event_label: 'For Listeners: Newsletter',
            })
        }
     //,
    //     {
    //         label: 'Swag Lab',
    //         url: 'https://shop.radiolab.org',
    //         target: '_blank',
    //         command: () => {
    //             const { $analytics } = useNuxtApp()
    //             $analytics.sendEvent('click_tracking', {
    //                 event_category: 'Click Tracking',
    //                 component: 'Navigation',
    //                 event_label: 'For Listeners: Swag Lab',
    //             })
    //         }
        }
    ]
},
{
    label: 'How to listen',
    to: '/how-to-listen',
    class: 'gap alone',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'How to listen',
        })
    }
},
{
    label: 'Become a member',
    to: '/the-lab',
    class: 'button alone',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Become a member',
        })
    }
},
{
    label: 'FAQs',
    visible: false,
    to: 'https://nypublicradio.force.com/wnyc/s/programming-help-and-feedback',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'FAQs',
        })
    }
},
{
    label: 'Sponsorship',
    visible: false,
    to: 'https://sponsorship.wnyc.org/',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Sponsorship',
        })
    }
},
{
    label: 'Diversity (DEI)',
    visible: false,
    to: 'https://www.nypublicradio.org/diversity-dei-overview/',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Diversity (DEI)',
        })
    }
},
{
    label: 'Internship Opportunities',
    visible: false,
    to: 'https://www.wnyc.org/internships-new-york-public-radio/',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Internship Opportunities',
        })
    }
},
{
    label: 'Terms of Use',
    visible: false,
    to: 'https://www.wnyc.org/terms/',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Terms of Use',
        })
    }
},
{
    label: 'Privacy Policy',
    visible: false,
    to: 'https://www.wnyc.org/privacy/',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Privacy Policy',
        })
    }
},
{
    label: 'Accessibility',
    visible: false,
    to: 'https://media.wnyc.org/media/resources/2022/May/06/accessibility_policy_5.6.22.pdf',
    command: () => {
        const { $analytics } = useNuxtApp()
        $analytics.sendEvent('click_tracking', {
            event_category: 'Click Tracking',
            component: 'Navigation',
            event_label: 'Accessibility',
        })
    }
},
]
