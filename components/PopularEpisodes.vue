<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate, publisherImageFormatter } from '~/utilities/helpers'
import axios from 'axios'
import VCard from 'nypr-design-system-vue3/v2/src/components/VCard.vue'
import ApplePodcasts from '~/components/icons/ApplePodcasts.vue'
const dataLoaded = ref(false)
const episodes = ref([])

onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/buckets/radiolab-radio-shows/?limit=3'
    )
    .then((response) => {
      episodes.value = response.data.data.attributes['bucket-items']
      dataLoaded.value = true
      console.log('episodes = ', episodes.value)
    })
})
</script>
 
<template>
  <div v-if="dataLoaded" class="popular-episodes">
    <div class="flex justify-content-between">
      <h2 class="mb-4">Popular Episodes</h2>
      <nuxt-link class="all-episodes" to="/episodes">All Episodes</nuxt-link>
    </div>
    <div class="grid">
      <div v-for="(episode, index) in episodes.slice(0, 3)" :key="index" class="col-12 xl:col-4">
        <!-- image="https://cms.prod.nypr.digital/images/328822/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/" -->
        <!-- image="https://media.wnyc.org/i/%width%/%height%/c/%quality%/2022/02/RL_Hello_EpisodeImage.png" -->
        <!-- :image="publisherImageFormatter(episode.attributes['image-main'].template)" -->
        <!-- :image="episode.attributes['image-main'].url" -->
        <!-- image="https://media.wnyc.org/i/%width%/%height%/c/%quality%/2021/11/Mixtape_EP5_Help_4x3.png" -->
        <v-card
          :image="episode.attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
          :alt="episode.attributes['image-main']['alt-text']"
          :title="episode.attributes.title"
          :titleLink="`/episodes/${episode.attributes.slug}`"
          :subtitle="formatDate(episode.attributes['publish-at'])"
          :max-width="episode.attributes['image-main'].w"
          :max-height="episode.attributes['image-main'].h"
          responsive
          bp="max"
          :ratio="[4, 3]"
          class="radiolab-card"
        >
          <p v-html="episode.attributes.tease" class="mb-5" />
          <p class="radiolab-card-podcasts">
            <apple-podcasts />Apple Podcasts
          </p>
        </v-card>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading Animation Goes Here!</p>
  </div>
</template>

<style lang="scss">
.popular-episodes {
  margin: 0 115px;
  @include media("<xl") {
    margin: 0;
  }
}

.popular-episodes > .grid {
  margin: 0 -33px;
}

.popular-episodes .grid > .col,
.popular-episodes .grid > [class*="col"] {
  padding: 0 33px;
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