<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import VCard from 'nypr-design-system-vue3/v2/src/components/VCard.vue'
import ApplePodcasts from '~/components/icons/ApplePodcasts.vue'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)
onMounted(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/1?limit=12'
    )
    .then((response) => {
      episodes.value = response.data.included
      totalCount.value = response.data.data.attributes['total-count']
      dataLoaded.value = true
    })
})

// handle pagination event
async function onPage(event) {
  //event.page: New page number
  //event.first: Index of first record
  //event.rows: Number of rows to display in new page
  //event.pageCount: Total number of pages
  dataLoaded.value = false
  await axios
    .get(
      `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/${event.page + 1}?limit=12`
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
}
</script>
 
<template>
  <div>
    <div class="episode-archive">
      <h1 class="mb-100">Episode Archive</h1>
      <div v-if="dataLoaded" class="grid">
        <div v-for="(episode, index) in episodes" :key="index" class="col-12 xl:col-4 mb-100">
          <v-card
            :image="episode.attributes['image-main'].url"
            :alt="episode.attributes['image-main']['alt-text']"
            :title="episode.attributes.title"
            :titleLink="`/episodes/${episode.attributes.slug}`"
            :subtitle="formatDate(episode.attributes['publish-at'])"
            :height="225"
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
      <skeleton v-else />
      <paginator v-show="dataLoaded" :first="0" :rows="12" :total-records="totalCount" @page="onPage($event)" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-archive h1 {
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.episode-archive > .grid {
    margin: 0 -35px;
}

.episode-archive .grid > .col,
.episode-archive .grid > [class*='col'] {
    padding: 0 35px;
}

.episode-archive .p-paginator {
  margin: auto;
}
</style>