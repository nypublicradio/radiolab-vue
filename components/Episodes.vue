<script setup>
import { formatDate, formatPublisherImageUrl } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'

const { $analytics } = useNuxtApp()
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
  kids: {
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
})

const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)
const startPageNumber = ref(props.startPage)
const axiosSuccessful = ref(true)
const cardsPerRow = ref(3) // based on grid col-4 on (>= lg breakpoint)

const rowsPerAdArr = []

/*
func to determine how many cards to show
*/
const cardCountCalc = computed(() => {
  return props.startCount
    ? props.startCount + props.rowCount * cardsPerRow.value
    : props.rowCount * cardsPerRow.value // (3 cards per )
})

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

// handle the episodes array based on startCount and buckeltlimit props
const getEpisodes = computed(() => {
  if (episodes.value.length === 0) {
    return []
  }
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
        : `${props.api}?page=${startPageNumber.value}&pageSize=${cardCountCalc.value}`
    )
    .then((response) => {
      episodes.value =
        response.data?.episodes?.data ||
        response.data?.data?.attributes?.bucketItems ||
        response.data?.included
      totalCount.value =
        response.data?.episodes?.meta?.pagination?.count ||
        response.data?.data?.attributes?.totalCount ||
        1
      dataLoaded.value = true
    })
    .catch(() => {
      axiosSuccessful.value = false
    })
})

// a watcher to update the route page query when startPageNumber changes
watch(startPageNumber, (page) => {
  navigateTo({
    query: { page },
  })
})

async function onPage(event) {
  //event.page: New page number
  //event.first: Index of first record
  //event.rows: Number of rows to display in new page
  //event.pageCount: Total number of pages
  dataLoaded.value = false
  await axios
    .get(`${props.api}?page=${event.page + 1}&pageSize=${cardCountCalc.value}`)
    .then((response) => {
      episodes.value =
        response.data?.episodes?.data ||
        response.data?.data?.attributes?.bucketItems ||
        response.data?.included
      dataLoaded.value = true
      // set startPageNumber var for page url param
      startPageNumber.value = event.page + 1
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episodes Pagination',
        event_label: `Page ${event.page + 1}`,
      })
    })
    .catch(() => {
      axiosSuccessful.value = false
    })
}

// function to handle card clicks and send analytics event
const onCardClick = (episode, elm) => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: `Episode Card - ${elm}`,
    event_label: episode.attributes.title,
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
                class="col flex justify-content-between align-items-end mb-3 px-0"
              >
                <h3 v-if="props.header">{{ props.header }}</h3>
                <v-flexible-link v-if="props.buttonText" raw :to="buttonLink">
                  <Button class="p-button-rounded p-button-sm">
                    {{ props.buttonText }}
                  </Button>
                </v-flexible-link>
              </div>
              <div class="grid justify-content-center">
                <template
                  v-for="(episode, index) in getEpisodes"
                  :key="`card${index}`"
                >
                  <div class="col-12 sm:col-6 lg:col-4 mb-6">
                    <client-only>
                      <v-card
                        :image="
                          formatPublisherImageUrl(
                            episode?.attributes
                              ? episode.attributes.imageMain.template
                              : episode.listingImage.template
                          )
                        "
                        :width="320"
                        :height="240"
                        :alt="
                          episode?.attributes
                            ? episode.attributes.imageMain.altText
                            : episode.listingImage.altText
                        "
                        :title="
                          episode?.attributes
                            ? episode.attributes.title
                            : episode.title
                        "
                        :titleLink="`/podcast/${
                          episode?.attributes
                            ? episode.attributes.slug
                            : episode.meta.slug
                        }`"
                        :eyebrow="
                          formatDate(
                            episode?.attributes
                              ? episode.attributes.publishAt
                              : episode.publicationDate
                          )
                        "
                        :blurb="
                          episode?.attributes
                            ? episode.attributes.tease
                            : episode.tease
                        "
                        :max-width="
                          episode?.attributes
                            ? episode.attributes.imageMain.w
                            : episode.listingImage.w
                        "
                        :max-height="
                          episode?.attributes
                            ? episode.attributes.imageMain.h
                            : episode.listingImage.h
                        "
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                        @title-click="onCardClick(episode, 'title')"
                        @image-click="onCardClick(episode, 'image')"
                      >
                        <div class="divider"></div>
                        <play-selector
                          :episode="episode"
                          :bucket="bucket"
                          :kids="kids"
                        />
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
