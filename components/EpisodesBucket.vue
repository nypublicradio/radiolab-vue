<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { formatDate, traverseObjectByString } from '~/utilities/helpers'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import PlaySelector from '~/components/PlaySelector.vue'

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
  path: {
    type: String,
    default: null,
  },
  limit: {
    type: Number,
    default: null,
  },
})

const dataLoaded = ref(false)
const episodes = ref([])
const axiosSuccessful = ref(true)

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

const cardCount = ref(props.limit + (props.limit % 2 ? 1 : 0))

const hideOnXl = (index) => {
  return cardCount.value % 3 && index + 1 === cardCount.value
}
</script>

<template>
  <div v-if="axiosSuccessful">
    <section>
      <div class="content lg:px-8">
        <div class="grid">
          <div class="col">
            <div v-if="dataLoaded" class="recent-episodes-bucket">
              <div
                v-if="props.header || props.buttonText"
                class="col flex justify-content-between align-items-center mb-3"
              >
                <h3 v-if="props.header">{{ props.header }}</h3>
                <v-flexible-link v-if="props.buttonText" raw :to="buttonLink">
                  <Button class="p-button-rounded p-button-sm">
                    {{ props.buttonText }}
                  </Button>
                </v-flexible-link>
              </div>
              <div class="grid">
                <template v-for="(episode, index) in episodes">
                  <div
                    :key="index"
                    v-if="limit ? index < cardCount : true"
                    class="col-12 md:col-6 xl:col-4 mb-6"
                    :class="{
                      'xl:hidden': hideOnXl(index),
                    }"
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
                </template>
              </div>
            </div>
            <episodes-bucket-skeleton
              v-else
              :count="limit ? limit : undefined"
            />
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
