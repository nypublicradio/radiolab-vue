<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import PlaySelector from '~/components/PlaySelector.vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps({
  header: {
    type: String,
    default: null,
  },
  buttonText: {
    type: String,
    default: null,
  },
  buttonLink: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: null,
  },
  rowCount: {
    type: Number,
    default: 1,
  },
  startCount: {
    type: Number,
    default: 0,
  },
  paginate: {
    type: Boolean,
    default: false,
  },

})

const dataLoaded = ref(false)
const episodes = ref([])

// const rowCountCalc = (() => {
//   console.log('rowCountCalc = ', ((props.rowCount * 3) + 1))
//   return ((props.rowCount * 3) + 1)
// })

const rowCountCalc = (props.startCount + ((props.rowCount * 3) + 1))
const axiosSuccessful = ref(true)

onBeforeMount(async () => {
  await axios
    .get(
      props.api + '?limit=' + rowCountCalc
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
    .catch(function (error) {
      // console.log(error)
      axiosSuccessful.value = false
    })
})
</script>
 
<template>
  <div v-if="axiosSuccessful">
    <section>
      <div class="content px-0 md:px-4 lg:px-8">
        <div class="grid">
          <div class="col">
            <div class="recent-episodes">
              <div v-if="dataLoaded" class="col flex justify-content-between">
                <h3 v-if="props.header" class="mb-4">{{ props.header }}</h3>
                <v-flexible-link v-if="props.buttonText" raw to="/episodes">
                  <Button class="p-button-rounded p-button-sm">{{ props.buttonText }}</Button>
                </v-flexible-link>
              </div>
              <div v-if="dataLoaded" class="grid">
                <div
                  v-for="(episode, index) in episodes.slice(props.startCount, rowCountCalc)"
                  :key="index"
                  :ind="index"
                  :ind-length="rowCountCalc"
                  class="col-12 md:col-6 xl:col-4 mb-5"
                  :class="{ 'xl:hidden': rowCount % 2 && index === rowCountCalc - 2 }"
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
                    <play-selector :episode="episode" />
                  </v-card>
                </div>
              </div>
              <skeleton v-else />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.latest-episode {
  max-width: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.latest-episode .latest-episode-title {
  text-decoration: none;
  @include media("<lg") {
    h2 {
      font-size: var(--font-size-12);
      line-height: var(--line-height-12);
    }
  }
}

.latest-episode .latest-episode-image {
  max-height: 500px;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
}

.latest-episode .latest-episode-content {
  background: var(--white100);
}

.latest-episode-tease {
  line-height: 24px;
}

.recent-episodes > .grid {
  margin: 0 -24px;
}

.recent-episodes .grid > .col,
.recent-episodes .grid > [class*="col"] {
  padding: 0 24px;
}
</style>