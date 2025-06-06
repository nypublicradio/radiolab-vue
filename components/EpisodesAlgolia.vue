<script setup>
//
import { onMounted, onBeforeMount, ref, computed, watch } from 'vue'
import { formatDate, formatPublisherImageUrl } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

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
  episodesSearchResults: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['searchPageEvent'])

const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)
const startPageNumber = ref(props.startPage)
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

  // temp data loaded
  dataLoaded.value = true
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

onBeforeMount(() => {
  // if the url query page has a value, set the startPageNumber to that value
  if (route.query.page) {
    startPageNumber.value = route.query.page
  }
})

// a watcher to update the route page query when startPageNumber changes
watch(startPageNumber, (page) => {
  navigateTo({
    query: { page: page },
  })
})

async function onPage(event) {
  //event.page: New page number
  //event.first: Index of first record
  //event.rows: Number of rows to display in new page
  //event.pageCount: Total number of pages
  emit('searchPageEvent', event)
  //dataLoaded.value = false
}
</script>

<template>
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
            <template v-if="episodesSearchResults?.hits?.length > 0">
              <div class="grid justify-content-center">
                <template
                  v-for="(episode, index) in episodesSearchResults?.hits"
                  :key="`searchCard${index}`"
                >
                  <div class="col-12 sm:col-6 lg:col-4 mb-6">
                    <!-- <v-flexible-link :to="episode.Link"
                        >{{ episode.Title }}
                        {{
                          formatDate(episode['Publish Date'])
                        }}</v-flexible-link
                      > -->
                    <client-only>
                      <v-card
                        :image="
                          episode['image-main'].template
                            ? formatPublisherImageUrl(
                                episode['image-main'].template
                              )
                            : episode['image-main'].url
                        "
                        :width="320"
                        :height="240"
                        :alt="episode['image-main']['alt-text']"
                        :title="episode.title"
                        :titleLink="`/podcast/${episode.slug}`"
                        :eyebrow="formatDate(episode['publish-at'])"
                        :blurb="episode.tease"
                        :max-width="episode['image-main'].w"
                        :max-height="episode['image-main'].h"
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                      >
                        <div class="divider"></div>
                        <play-selector :episode="episode" />
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
            </template>
            <div v-else-if="episodesSearchResults?.hits">
              no results, search again
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
            v-show="props.paginate && episodesSearchResults?.nbPages > 1"
            :total-records="episodesSearchResults?.nbHits"
            :pageLinkSize="3"
            :rows="cardCountCalc"
            @page="onPage($event)"
          />
          <!-- 
              :style="`pointer-events: ${dataLoaded ? 'auto' : 'none'}`"
              :rows="cardCountCalc"
              :first="startPageNumber * cardCountCalc - 1" 
            -->
        </div>
      </div>
    </div>
  </section>
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
