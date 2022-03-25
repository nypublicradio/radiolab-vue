<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
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
  rowCount: {
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

})

const dataLoaded = ref(false)
const episodes = ref([])
const totalCount = ref(null)

const rowCountCalc = props.paginate
  ?
  // Bono: I was unable to suppoort the hidden odd episode with pagination. I could not figure out the correct way to do it. When paginating, startCount is always 0 and the odd episode is not added and hidden. 
  props.rowCount * 3
  :
  (props.startCount + ((props.rowCount * 3) + (props.rowCount % 2 ? 1 : 0)))

const axiosSuccessful = ref(true)

onBeforeMount(async () => {
  await axios
    .get(
      `${props.api}${props.startPage}?limit=${rowCountCalc}`
    )
    .then((response) => {
      //episodes.value = response.data.included
      episodes.value = eval(`response.${props.path}`)
      //console.log('response.data.included  =', response.data.included)
      totalCount.value = response.data.data.attributes['total-count']
      dataLoaded.value = true
    })
    .catch(function (error) {
      // console.log(error)
      axiosSuccessful.value = false
    })
})

async function onPage(event) {
  //event.page: New page number
  //event.first: Index of first record
  //event.rows: Number of rows to display in new page
  //event.pageCount: Total number of pages
  dataLoaded.value = false
  await axios
    .get(
      `${props.api}${event.page + 1}?limit=${rowCountCalc}`
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    }).catch(function (error) {
      console.log(error)
      axiosSuccessful.value = false
    })
}
</script>
 
<template>
  <div v-if="axiosSuccessful">
    <section>
      <div class="content px-0 md:px-4 lg:px-8">
        <div class="grid">
          <div class="col">
            <div class="recent-episodes">
              <div
                v-if="dataLoaded"
                class="col flex justify-content-between align-items-center mb-3"
              >
                <h3 v-if="props.header">{{ props.header }}</h3>
                <v-flexible-link v-if="props.buttonText" raw to="/episodes">
                  <Button class="p-button-rounded p-button-sm">{{ props.buttonText }}</Button>
                </v-flexible-link>
              </div>
              <div v-if="dataLoaded" class="grid">
                <div
                  v-for="(episode, index) in episodes.slice(props.paginate ? 0 : props.startCount, rowCountCalc)"
                  :key="index"
                  class="col-12 md:col-6 xl:col-4 mb-5"
                  :class="{ 'xl:hidden': !props.paginate && rowCount % 2 && index === episodes.length - 1 - props.startCount }"
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
              <episodes-skeleton
                v-else
                :row-count="rowCountCalc"
                :header="props.header"
                :button-text="props.buttonText"
              />
              <paginator
                :style="`pointer-events: ${dataLoaded ? 'auto' : 'none'}`"
                v-show="props.paginate"
                :pageLinkSize="3"
                :first="0"
                :rows="episodes.length"
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
.recent-episodes > .grid {
  margin: 0 -24px;
}
.recent-episodes .grid > .col,
.recent-episodes .grid > [class*="col"] {
  padding: 0 24px;
}

.recent-episodes .p-paginator {
  margin: auto;
}
</style>