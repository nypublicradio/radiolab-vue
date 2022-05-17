<script setup>
import gaEvent from '../utilities/ga.js'
import { onBeforeMount, ref, computed, watch } from 'vue'
import {
  formatDate,
  bpSizes,
  traverseObjectByString,
} from '~/utilities/helpers'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import PlaySelector from '~/components/PlaySelector.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  api: {
    type: String,
    default: null,
  },
  path: {
    type: String,
    default: null,
  },
})

const dataLoaded = ref(false)
const episodes = ref([])
const axiosSuccessful = ref(true)
const cardsPerRow = 3
const totalCards = 3

onBeforeMount(async () => {
  await axios
    .get(props.api)
    .then((response) => {
      episodes.value = traverseObjectByString(props.path, response)
      dataLoaded.value = true
    })
    .catch(function () {
      axiosSuccessful.value = false
    })
})
</script>

<template>
  <div v-if="axiosSuccessful">
    <section>
      <div class="content lg:px-8">
        <div class="grid">
          <div class="col">
            <div v-if="dataLoaded" class="recent-episodes-bucket">
              <div class="grid">
                <template v-for="(episode, index) in episodes">
                  <div
                    :key="index"
                    v-if="
                      index < episodes.length / 2 ||
                      index > episodes.length / 2 - 1
                    "
                    class="col-12 md:col-6 xl:col-4 mb-6"
                  >
                    <client-only>
                      <v-card
                        :image="
                          episode.attributes['image-main'].template.replace(
                            '%s/%s/%s/%s',
                            '%width%/%height%/c/%quality%'
                          )
                        "
                        :width="320"
                        :height="240"
                        :alt="episode.attributes['image-main']['alt-text']"
                        :title="episode.attributes.title"
                        :titleLink="`/episodes/${episode.attributes.slug}`"
                        :eyebrow="formatDate(episode.attributes['publish-at'])"
                        :blurb="episode.attributes.tease"
                        :max-width="episode.attributes['image-main'].w"
                        :max-height="episode.attributes['image-main'].h"
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                      >
                        <div class="divider"></div>
                        <play-selector :episode="episode.attributes" />
                      </v-card>
                    </client-only>
                  </div>
                  <div
                    :key="index"
                    v-if="index === episodes.length / 2 - 1"
                    class="htlad-radiolab_in-content_1 col-fixed mb-6"
                    style="width: 100%"
                  />
                </template>
              </div>
            </div>
            <episodes-bucket-skeleton v-else :row-count="1" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.recent-episodes-bucket > .grid {
  margin: 0 -24px;
}

.recent-episodes-bucket .grid > .col,
.recent-episodes-bucket .grid > [class*='col'] {
  padding: 0 24px;
}

.recent-episodes-bucket .p-paginator {
  margin: auto;
}
</style>
