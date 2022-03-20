<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import ApplePodcasts from '~/components/icons/ApplePodcasts.vue'
import PlaySelector from '~/components/PlaySelector.vue'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const episodes = ref([])
onBeforeMount(async () => {
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
  <section>
    <div class="content px-0 pt-2">
      <div class="grid">
        <div class="col">
          <div v-if="dataLoaded" class="latest-episode grid">
            <div class="col-12 xl:col-7 p-0">
              <v-image-with-caption
                :image="episodes[0].attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
                :imageUrl="`/episodes/${episodes[0].attributes.slug}`"
                :alt="episodes[0].attributes['image-main']['alt-text']"
                :max-width="episodes[0].attributes['image-main'].w"
                :max-height="episodes[0].attributes['image-main'].h"
                :ratio="[4, 3]"
                class="latest-episode-image"
              />
            </div>
            <div class="latest-episode-content col-12 xl:col-5 p-7">
              <h5 class="mb-2">Latest Episode</h5>
              <v-flexible-link
                :to="`/episodes/${episodes[0].attributes.slug}`"
                class="latest-episode-title"
              >
                <h2 class="mb-3 inline-block" v-html="episodes[0].attributes.title"></h2>
              </v-flexible-link>
              <p v-html="episodes[0].attributes.tease" class="latest-episode-tease mb-5 truncate" />
              <play-selector />
            </div>
          </div>
          <latest-episode-skeleton v-else />
        </div>
      </div>
    </div>
    <section class="recent-episodes">
      <div class="content">
        <div v-if="dataLoaded" class="grid">
          <div class="col flex justify-content-between">
            <h3 class="mb-4">Recent Episodes</h3>
            <v-flexible-link raw to="/episodes">
              <Button class="p-button-rounded p-button-sm">All Episodes</Button>
            </v-flexible-link>
          </div>
        </div>
        <div v-if="dataLoaded" class="grid">
          <div
            v-for="(episode, index) in episodes.slice(1, 4)"
            :key="index"
            class="col-12 xl:col-4 mb-5"
          >
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
              :ratio="[4, 3]"
              bp="max"
              class="radiolab-card"
            >
              <p v-html="episode.attributes.tease" class="mb-5 truncate t3lines" />
              <play-selector />
            </v-card>
          </div>
        </div>
        <skeleton v-else />
      </div>
    </section>
  </section>
</template>

<style lang="scss">
.latest-episode {
  max-width: 100%;
  margin-bottom: 100px;
}

.latest-episode .latest-episode-title {
  text-decoration: none;
}

.latest-episode .latest-episode-image {
  max-height: 500px;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.latest-episode .latest-episode-content {
  background: var(--white100);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.latest-episode-tease {
  line-height: 24px;
}

.recent-episodes > .grid {
  margin: 0 -33px;
}

.recent-episodes .grid > .col,
.recent-episodes .grid > [class*="col"] {
  padding: 0 33px;
}
</style>