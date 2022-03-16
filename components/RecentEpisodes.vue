<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import VCard from 'nypr-design-system-vue3/v2/src/components/VCard.vue'
import ApplePodcasts from '~/components/icons/ApplePodcasts.vue'
const dataLoaded = ref(false)
const episodes = ref([])
onMounted(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/1?limit=4'
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <div v-if="dataLoaded">
    <div class="latest-episode grid justify-content-center">
      <div class="col-12 xl:col-8 p-0">
        <img class="latest-episode-image" :src="episodes[0].attributes['image-main'].url" :alt="episodes[0].attributes['image-main']['alt-text']" />
      </div>
      <div class="latest-episode-content col-12 xl:col-4 p-8">
        <p class="latest-episode-header mb-2">Latest Episode</p>
        <h2 class="mb-4"><nuxt-link :to="episodes[0].attributes.url" v-html="episodes[0].attributes.title" class="latest-episode-title" /></h2>
        <p v-html="episodes[0].attributes.tease" class="latest-episode-tease mb-5" />
        <p class="latest-episode-podcasts"><apple-podcasts /> Apple Podcasts</p>
      </div>
    </div>
    <div class="recent-episodes">
      <div class="flex justify-content-between">
        <h2 class="mb-4">Recent Episodes</h2>
        <nuxt-link class="all-episodes" to="/episodes">All Episodes</nuxt-link>
      </div>
      <div class="grid">
        <div v-for="(episode, index) in episodes.slice(1,4)" :key="index" class="col-12 xl:col-4">
          <v-card
            :image="episode.attributes['image-main'].url"
            :alt="episode.attributes['image-main']['alt-text']"
            :title="episode.attributes.title"
            :titleLink="`/episodes/${episode.attributes.slug}`"
            :subtitle="formatDate(episode.attributes['publish-at'])"
            width="100%"
            height="225"
            :max-width="episode.attributes['image-main'].w"
            :max-height="episode.attributes['image-main'].h"
            responsive
            bp="max"
            class="radiolab-card"
          >
            <p v-html="episode.attributes.tease" class="mb-5" />
            <p class="radiolab-card-podcasts"><apple-podcasts /> Apple Podcasts</p>
          </v-card>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading Animation Goes Here!</p>
  </div>
</template>

<style lang="scss">
.latest-episode  {
  max-width: 100%;
  margin-bottom: 100px;
}

.latest-episode .latest-episode-title {
  color: var(--primary-text-color);
  text-decoration: none;
  font-weight: 400;
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.latest-episode .latest-episode-image {
  max-height: 500px;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.latest-episode .latest-episode-content {
  background: var(--white100);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.latest-episode .latest-episode-header {
  font-size: var(--font-size-5);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.latest-episode-tease {
  font-size: var(--font-size-6);
  line-height: 24px;
}

.latest-episode .latest-episode-podcasts {
  display: flex;
  align-content: flex-start;
  text-transform: uppercase;
  font-size: var(--font-size-8);
  svg {
    margin-right: 7px;
  }
}

.recent-episodes  {
  margin: 0 115px;
  @include media("<xl") {
    margin: 0;
  }
}

.recent-episodes > .grid {
  margin: 0 -45px;
}

.recent-episodes .grid>.col,
.recent-episodes .grid>[class*=col] {
  padding: 0 45px;
}

.all-episodes {
  background: var(--white100);
  border-radius: 80px;
  width: 110px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: var(--primary-text-color);
  text-decoration: none;
  font-size: var(--font-size-6);
}
</style>