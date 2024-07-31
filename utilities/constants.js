export const playServices = [
  /* { name: 'Listen', icon: 'site', url:'' }, */
  {
    name: 'Apple Podcasts',
    icon: 'apple',
    url: 'https://podcasts.apple.com/us/podcast/radiolab/id152249110?itsct=radiolab_podcasts&itscg=30200&ls=1&at=1000l39Mm&ct=rldotorg'
  },
  {
    name: 'Spotify',
    icon: 'spotify',
    url: 'https://open.spotify.com/show/2hmkzUtix0qTqvtpPcMzEL'
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    url: 'https://www.youtube.com/@Radiolabpod'
  },
  {
    name: 'Overcast',
    icon: 'overcast',
    url: 'https://overcast.fm/itunes152249110/radiolab'
  },
  {
    name: 'NPR One',
    icon: 'nprone',
    url: 'https://www.npr.org/podcasts/452538884/radiolab'
  },
  /*{
    name: 'Google Podcasts',
    icon: 'google',
    url: 'https://podcasts.google.com/feed/aHR0cDovL2ZlZWRzLndueWMub3JnL3JhZGlvbGFi'
  },*/
  {
    name: 'Castbox',
    icon: 'castbox',
    url: 'https://castbox.fm/channel/Radiolab-id129730?country=us'
  },
  {
    name: 'Amazon Music',
    icon: 'amazon',
    url: 'https://music.amazon.com/podcasts/779c24b4-dfe8-497a-83bb-67e729c1177b/Radiolab'
  },
  {
    name: 'Pocket Cast',
    icon: 'pocketcast',
    url: 'https://pca.st/radiolab'
  },
  {
    name: 'Podcast Addict',
    icon: 'podcastaddict',
    url: 'https://podcastaddict.com/podcast/191'
  },
  {
    name: 'RSS',
    icon: 'rss',
    url: 'https://feeds.simplecast.com/EmVW7VGp'
  }
]

export const playServicesKids = [
  /* { name: 'Listen', icon: 'site', url:'' }, */
  {
    name: 'Apple Podcasts',
    icon: 'apple',
    url: 'https://podcasts.apple.com/us/podcast/radiolab-for-kids/id1504895463'
  },
  {
    name: 'Spotify',
    icon: 'spotify',
    url: 'https://open.spotify.com/show/7Cwpx4gjeTPngGPCusfes3'
  },
  /*{
    name: 'YouTube',
    icon: 'youtube',
    url: 'https://www.youtube.com/@Radiolabpod'
  },*/
  {
    name: 'Overcast',
    icon: 'overcast',
    url: 'https://overcast.fm/itunes1504895463'
  },
  {
    name: 'NPR One',
    icon: 'nprone',
    url: 'https://www.npr.org/podcasts/828094942/radiolab-for-kids'
  },
  /*{
    name: 'Google Podcasts',
    icon: 'google',
    url: 'https://podcasts.google.com/feed/aHR0cDovL2ZlZWRzLndueWMub3JnL3JhZGlvbGFi'
  },*/
  {
    name: 'Castbox',
    icon: 'castbox',
    url: 'https://castbox.fm/channel/Radiolab-for-Kids-id5100056?country=us'
  },
  {
    name: 'Amazon Music',
    icon: 'amazon',
    url: 'https://music.amazon.com/podcasts/3b2668be-02e8-4dca-993d-590019bbff08/radiolab-for-kids'
  },
  {
    name: 'Pocket Cast',
    icon: 'pocketcast',
    url: 'https://pca.st/grtbu9ha'
  },
  {
    name: 'Podcast Addict',
    icon: 'podcastaddict',
    url: 'https://podcastaddict.com/podcast/radiolab-for-kids/4582870'
  },
  {
    name: 'RSS',
    icon: 'rss',
    url: 'https://feeds.simplecast.com/fS_LWlfx'
  }
]

export const yearFilterOptions = [ {
  year: 'All'
} ]
const yearfilterStart = 2007
const yearfilterEnd = new Date().getFullYear()
Array.from( new Array( yearfilterEnd - yearfilterStart + 1 ), ( x, i ) =>
  yearFilterOptions.push( {
    'year': String( yearfilterEnd - i )
  } )
)
//console.log('yearFilterOptions = ', yearFilterOptions)


export const lsSelectedPlayService = 'selectedPlayService'