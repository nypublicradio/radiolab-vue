<script setup>
import gaEvent from '../utilities/ga.js'
import { onMounted, onBeforeMount, ref, computed, watch } from 'vue'
import { formatDate, traverseObjectByString } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import PlaySelector from '~/components/PlaySelector.vue'

const router = useRouter()
const route = useRoute()

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
  rowCount: {
    type: Number,
    default: 1,
  },
  rowsPerAd: {
    type: Number,
    default: 1,
  },
  startCount: {
    type: Number,
    default: 0,
  },
  startPage: {
    type: Number,
    default: 1,
  },
  paginate: {
    type: Boolean,
    default: false,
  },
  showLastAd: {
    type: Boolean,
    default: false,
  },
  bucket: {
    type: Boolean,
    default: false,
  },
  bucketLimit: {
    type: Number,
    default: null,
  },
  episodesSearchResults: {
    type: Object,
    default: null,
  },
})

const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)
const startPageNumber = ref(props.startPage)
const axiosSuccessful = ref(true)
const cardsPerRow = ref(3) // based on grid col-4 on (>= lg breakpoint)

const rowsPerAdArr = []

onMounted(() => {
  let currentCardsPerRow = cardsPerRow.value
  // when less than breakpoint.lg, we are showing 2 cards per row, update currentCardsPerRow var
  if (window.innerWidth <= breakpoint.lg) {
    currentCardsPerRow = 2
  }
  // get the total number of ads that will show in the current layout
  const numOfAds =
    cardCountCalc.value / props.rowsPerAd / currentCardsPerRow +
    (props.showLastAd ? 1 : 0)
  // loop through the number of ads and push number where the add will populate to the rowsPerAdArr
  for (let i = 1; i < numOfAds; i++) {
    const adPoint = i * props.rowsPerAd * currentCardsPerRow
    rowsPerAdArr.push(adPoint)
  }
})

// checks if the index is where we should populate an ad
const insertAD = (index) => {
  return rowsPerAdArr.includes(index)
}

/*
func to determin how many cards to show
*/
const cardCountCalc = computed(() => {
  return props.startCount
    ? props.startCount + props.rowCount * cardsPerRow.value
    : props.rowCount * cardsPerRow.value // (3 cards per )
})

// handle the episodes array based on startCount and buckeltlimit props
const getEpisodes = computed(() => {
  // if using startCount, we need to offset the episodes array
  return props.startCount
    ? episodes.value.slice(props.startCount, cardCountCalc.value)
    : // if limiting the bucket, we need to limit the episodes array
    props.bucketLimit
    ? episodes.value.slice(0, props.bucketLimit)
    : episodes.value
})

onBeforeMount(async () => {
  // if the url query page has a value, set the startPageNumber to that value
  if (route.query.page) {
    startPageNumber.value = route.query.page
  }

  await axios
    .get(
      props.bucket
        ? props.api
        : `${props.api}${startPageNumber.value}?limit=${cardCountCalc.value}`
    )

    .then((response) => {
      episodes.value = traverseObjectByString(props.path, response)
      totalCount.value = response.data.data.attributes['total-count']
      dataLoaded.value = true
    })
    .catch(function () {
      axiosSuccessful.value = false
    })
})

// a watcher to update the route page query when startPageNumber changes
watch(startPageNumber, (page, prev) => {
  router.push({
    query: { page: page },
  })
})

async function onPage(event) {
  //event.page: New page number
  //event.first: Index of first record
  //event.rows: Number of rows to display in new page
  //event.pageCount: Total number of pages
  dataLoaded.value = false
  await axios
    .get(`${props.api}${event.page + 1}?limit=${cardCountCalc.value}`)
    .then((response) => {
      episodes.value = traverseObjectByString(props.path, response)
      dataLoaded.value = true
      // set startPageNumber var for page url param
      startPageNumber.value = event.page + 1
      gaEvent('Click Tracking', 'Episodes Pagination', `Page ${event.page + 1}`)
    })
    .catch(function () {
      axiosSuccessful.value = false
    })
}
</script>

<template>
  <div v-if="axiosSuccessful">
    <section>
      <div class="content xl:px-8">
        <div class="grid">
          <div class="col">
            <div v-if="dataLoaded" class="recent-episodes">
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
              <!-- search results section -->
              <div v-if="episodesSearchResults?.hits?.length > 0">
                <template
                  v-for="(episode, index) in episodesSearchResults?.hits"
                  :key="`searchCard${index}`"
                >
                  <div>
                    <v-flexible-link :to="episode.Link"
                      >{{ episode.Title }}
                      {{ formatDate(episode['Publish Date']) }}</v-flexible-link
                    >
                  </div>
                </template>
              </div>
              <div v-else v-if="episodesSearchResults?.hits">
                no results, search again
              </div>
              <!-- search results section -->
              <div class="grid justify-content-center">
                <template
                  v-for="(episode, index) in getEpisodes"
                  :key="`card${index}`"
                >
                  <div class="col-12 sm:col-6 lg:col-4 mb-6">
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
                    v-if="props.rowCount > 1 && insertAD(index + 1)"
                    class="htlad-radiolab_in-content_1 col-fixed mb-6"
                    style="width: 100%"
                  />
                </template>
              </div>
            </div>
            <episodes-skeleton
              v-else
              :card-count="cardCountCalc - startCount"
              :header="props.header"
              :button-text="props.buttonText"
              :paginate="props.paginate"
            />
            <paginator
              :style="`pointer-events: ${dataLoaded ? 'auto' : 'none'}`"
              v-show="props.paginate"
              :total-records="totalCount"
              :rows="cardCountCalc"
              :first="startPageNumber * cardCountCalc - 1"
              :pageLinkSize="3"
              @page="onPage($event)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.recent-episodes > .grid {
  margin: 0 -24px;
}

.recent-episodes .grid > .col,
.recent-episodes .grid > [class*='col'] {
  padding: 0 24px;
}

.recent-episodes .p-paginator {
  margin: auto;
}
</style>
