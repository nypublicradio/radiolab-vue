// Get tracking values for GA for an article
export function useEpisodePageTrackingData(episode): Record<string, string> {
    //console.log('episode = ', episode)
    return {
        page_type: 'episode',
        episode_slug: episode.slug,
        episode_url: episode.url,
        episode_show: episode.show,
        episode_producing_orgs: episode['show-producing-orgs'].map((org: { name: string }) => org.name).join(','),
        episode_publish_date: episode['publish-at'],
        episode_tags: episode.tags.map((tag: string) => tag).join(','),
        episode_title: episode.title,
        episode_primary_tag: episode.tags[0]
    }
}