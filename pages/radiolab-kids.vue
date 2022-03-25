<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import PlaySelector from '~/components/PlaySelector.vue'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)
onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab-kids/recent_stories/1?limit=12'
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
      `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab-kids/recent_stories/${event.page + 1}?limit=12`
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
}
</script>
 
<template>
  <div>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col">
            <div class="radiolab-for-kids">
              <h1 class="mb-4">Radiolab for Kids</h1>
              <p class="mb-8">Kid-friendly stories curated by Radiolab. All in one bingeable spot!</p>
              <div v-if="dataLoaded" class="grid">
                <div v-for="(episode, index) in episodes" :key="index" class="col-12 xl:col-4 mb-8">
                  <v-card
                    :image="episode.attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
                    :alt="episode.attributes['image-main']['alt-text']"
                    :title="episode.attributes.title"
                    :titleLink="`/episodes/${episode.attributes.slug}`"
                    :eyebrow="formatDate(episode.attributes['publish-at'])"
                    :blurb="episode.attributes.tease"
                    :max-width="episode.attributes['image-main'].w"
                    :max-height="episode.attributes['image-main'].h"
                    responsive
                    :ratio="[4, 3]"
                    bp="max"
                    class="radiolab-card"
                  >
                    <div class="divider"></div>
                    <play-selector />
                  </v-card>
                </div>
              </div>
              <skeleton v-else />
              <paginator
                v-show="dataLoaded"
                :first="0"
                :rows="12"
                :total-records="totalCount"
                @page="onPage($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.radiolab-for-kids h1 {
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.radiolab-for-kids > .grid {
  margin: 0 -24px;
}

.radiolab-for-kids .grid > .col,
.radiolab-for-kids .grid > [class*="col"] {
  padding: 0 24px;
}

.radiolab-for-kids .p-paginator {
  margin: auto;
}
</style>