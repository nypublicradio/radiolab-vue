export const playServices = [
  /* { name: 'Listen', icon: 'site', url:'' }, */
  { name: 'Apple Podcasts', icon: 'apple', url: 'https://itunes.apple.com/us/podcast/radiolab/id152249110?mt=2' },
  { name: 'Spotify', icon: 'spotify', url: 'https://open.spotify.com/show/2hmkzUtix0qTqvtpPcMzEL' },
  { name: 'Overcast', icon: 'overcast', url: 'https://overcast.fm/itunes152249110/radiolab' },
  { name: 'Stitcher', icon: 'stitcher', url: 'https://www.stitcher.com/podcast/wnycs-radiolab' },
  { name: 'NPR One', icon: 'nprone', url: 'https://www.npr.org/podcasts/452538884/radiolab' },
  { name: 'Google Podcasts', icon: 'google', url: 'https://podcasts.google.com/feed/aHR0cDovL2ZlZWRzLndueWMub3JnL3JhZGlvbGFi' },
  { name: 'Castbox', icon: 'castbox', url: 'https://castbox.fm/channel/Radiolab-id129730?country=us' },
  { name: 'Amazon Music', icon: 'amazon', url: 'https://music.amazon.com/podcasts/779c24b4-dfe8-497a-83bb-67e729c1177b/Radiolab' },
  { name: 'Pocket Cast', icon: 'pocketcast', url: 'https://pca.st/radiolab' },
  { name: 'Podcast Addict', icon: 'podcastaddict', url: 'https://podcastaddict.com/podcast/191' },
  { name: 'RSS', icon: 'rss', url: 'http://feeds.wnyc.org/radiolab' }
]

export const yearFilterOptions = [{ year: 'All' }]
const yearfilterStart = 2007
const yearfilterEnd = new Date().getFullYear()
Array.from(new Array(yearfilterEnd - yearfilterStart + 1), (x, i) =>
  yearFilterOptions.push({ 'year': String(yearfilterEnd - i) })
)
//console.log('yearFilterOptions = ', yearFilterOptions)


export const lsSelectedPlayService = 'selectedPlayService'