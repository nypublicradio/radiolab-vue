<script setup>
import { useRuntimeConfig } from '#app'
import TitleWithSearch from '~/components/TitleWithSearch.vue'
import { ref, watch } from 'vue'

const { result, search } = useSearch('radiolab') // pass your index name as param
const searchTerm = ref('')
const searchYear = ref('')
const searchPage = ref(0)
const searchResults = ref(null)
const isSearching = ref(false)

// the actual search logic to Algolia
const searching = async () => {
  isSearching.value = true
  // gets time stamp (ts) from beginning of the selected year
  const selectedYearSeconds =
    new Date(`January 1, ${searchYear.value} 00:00:00`).getTime() / 1000
  // set length of one year in seconds
  const yearSeconds = 31556926
  // if a search year is selected, set the search range filter to the selected year
  const filters = searchYear.value
    ? `date-line-ts:${selectedYearSeconds} TO ${
        selectedYearSeconds + yearSeconds
      }`
    : ''
  // console.log('searching ---------')
  // console.log('term = ', searchTerm.value)
  // console.log('page = ', searchPage.value)
  // console.log('year = ', searchYear.value)
  // console.log('filters = ', filters)
  await search({
    query: searchTerm.value,
    requestOptions: {
      page: searchPage.value,
      filters: filters,
    },
  }).then(({ hits }) => {
    //console.log('result   = ', result.value)
    searchResults.value = result.value
    setTimeout(() => {
      isSearching.value = false
    }, 500)
  })
}

// fired when the user presses enter or searches in the input textfield whitch triggers a Algolia search and controls the loading icon spinner state
const onSearch = async (term) => {
  searchTerm.value = term
  searching()
}
// fired every time the search input is updated except with the enter key, this then detects if the field is empty, and to clear the results
const onUpdate = (event) => {
  console.log('searchYear.value = ', searchYear.value)
  searchTerm.value = event
  if (event === '' && searchYear.value === '') {
    searchResults.value = null
  } else {
    searchPage.value = 0
    searching()
  }
}
// every time the user paginates, the method is called to update the page number in the Algolia search
const updatePaginationInfo = (event) => {
  searchPage.value = event.page
  searching()
}
// every time the user selects a year filter, the method is called to update the filter in the Algolia search
const onYearFilter = (yearValue) => {
  /* console.log('onYearFilter -------------')
  console.log('yearValue = ', yearValue) */
  const thisTerm = searchTerm.value ? searchTerm.value : ''
  const thisYear = isNaN(yearValue) ? '' : yearValue
  /*  console.log('thisTerm = ', thisTerm)
  console.log('thisYear = ', thisYear) */
  searchTerm.value = thisTerm
  searchYear.value = thisYear
  searchPage.value = 0
  searching()
}

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Episode Archive | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Episode Archive | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:title"
          content="Episode Archive | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <title-with-search
              title="Episode Archive"
              placeholder="Search by topic, guest, host"
              :isSearching="isSearching"
              @search="onSearch"
              @update="onUpdate"
              @year="onYearFilter"
            />
          </div>
        </div>
      </div>
    </section>

    <episodes-algolia
      v-if="searchResults"
      class="mb-4"
      :row-count="4"
      :rowsPerAd="2"
      :episodes-search-results="searchResults"
      :paginate="true"
      @search-page-event="updatePaginationInfo"
    />
    <episodes
      v-else
      class="mb-4"
      :row-count="4"
      :rowsPerAd="2"
      :api="apiUrl"
      path="data.included"
      :paginate="true"
    />
    <div class="htlad-radiolab_in-content_2 mb-8" />
  </div>
</template>

<style lang="scss"></style>
