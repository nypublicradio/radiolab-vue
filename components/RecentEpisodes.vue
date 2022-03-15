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
      <div class="col-8 p-0">
        <img class="latest-episode-image" :src="episodes[0].attributes['image-main'].url" :alt="episodes[0].attributes['image-main']['alt-text']" />
      </div>
      <div class="latest-episode-content col-4 p-8">
        <p class="uppercase mb-2">Latest Episode</p>
        <h2 class="mb-4"><nuxt-link :to="episodes[0].attributes.url">{{ episodes[0].attributes.title }}</nuxt-link></h2>
        <p class="mb-5">{{ episodes[0].attributes.tease}}</p>
        <p class="latest-episode-podcasts"><apple-podcasts /> Apple Podcasts</p>
      </div>
    </div>
    <div class="flex justify-content-between">
      <h2 class="mb-4">Recent Episodes</h2>
      <nuxt-link class="all-episodes" to="/episodes">All Episodes</nuxt-link>
    </div>
    <div class="recent-episodes grid">
      <div v-for="(episode, index) in episodes.slice(1,4)" :key="index" class="col-4">
        <v-card
          :image="episode.attributes['image-main'].url"
          :alt="episode.attributes['image-main']['alt-text']"
          :title="episode.attributes.title"
          :titleLink="`/episodes/${episode.attributes.slug}`"
          :subtitle="formatDate(episode.attributes['publish-at'])"
          responsive
          bp="max"
        >
          <p class="mb-5">{{ episode.attributes.tease}}</p>
          <p class="recent-episode-podcasts"><apple-podcasts /> Apple Podcasts</p>
        </v-card>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading Animation Goes Here!</p>
  </div>
</template>

<style lang="scss">
.latest-episode  {
  margin-bottom: 100px;
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
  background: #F4F2F0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.latest-episode-podcasts,
.recent-episode-podcasts {
  display: flex;
  align-content: flex-start;
  text-transform: uppercase;
  svg {
    margin-right: 7px;
  }
}

.recent-episodes .v-card {
  background: #F4F2F0;
  border-radius: 20px;
  box-shadow: none;
}

.recent-episodes .v-card .card-details {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 2.25rem;
}

.recent-episodes .v-card .card-subtitle {
  display: flex;
  order: 1;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.recent-episodes .v-card .card-title,
.recent-episodes .v-card .card-slot {
  order: 2;
}

.all-episodes {
  background: #F4F2F0;
  border-radius: 80px;
  width: 110px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #0A0B0C;
  text-decoration: none;
  font-size: 16px;
}
</style>