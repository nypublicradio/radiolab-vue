<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate, publisherImageFormatter } from '~/utilities/helpers'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const episodes = ref([])

onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/buckets/radiolab-radio-shows/?limit=4'
    )
    .then((response) => {
      episodes.value = response.data.data.attributes['bucket-items']
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <section>
    <div class="content px-0 md:px-4 lg:px-8">
      <div class="grid">
        <div class="col">
          <div class="popular-episodes">
            <div v-if="dataLoaded" class="flex justify-content-between">
              <h3 class="mb-4">Popular Episodes</h3>
              <v-flexible-link raw to="/episodes">
                <Button class="p-button-rounded p-button-sm">All Episodes</Button>
              </v-flexible-link>
            </div>
            <div v-if="dataLoaded" class="grid">
              <div
                v-for="(episode, index) in episodes.slice(0, 4)"
                :key="index"
                class="col-12 md:col-6 xl:col-4 mb-5"
                :class="{ 'xl:hidden': index === 3 }"
              >
                <v-card
                  :image="episode.attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
                  :alt="episode.attributes['image-main']['alt-text']"
                  :title="episode.attributes.title"
                  :titleLink="`/episodes/${episode.attributes.slug}`"
                  :eyebrow="formatDate(episode.attributes['publish-at'])"
                  :blurb="episode.attributes.tease"
                  :height="225"
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.popular-episodes > .grid {
  margin: 0 -24px;
}

.popular-episodes .grid > .col,
.popular-episodes .grid > [class*="col"] {
  padding: 0 24px;
}
</style>