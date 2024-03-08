<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`
/*Algolia Search START*/
const { result, search } = useAlgoliaSearch(config.ALGOLIA_RADIOLAB_INDEX) // pass your index name as param
const searchTerm = ref('')
const searchYear = ref('')
const searchPage = ref(0)
const searchResults = ref(null)
const isSearching = ref(false)

// the actual search logic to Algolia
const searching = async () => {
  isSearching.value = true
  // gets time stamp from beginning of the selected year
  const selectedYearSeconds =
    new Date(`January 1, ${searchYear.value} 00:00:00`).getTime() / 1000
  // set length of one year in seconds
  const yearSeconds = 31556926
  // if a search year is selected, set the search range filter to the selected year timestamp TO selectedYearSeconds + yearSeconds
  const filters = searchYear.value
    ? `date-line-ts:${selectedYearSeconds} TO ${
        selectedYearSeconds + yearSeconds
      }`
    : ''
  await search({
    query: searchTerm.value,
    requestOptions: {
      page: searchPage.value,
      filters: filters,
    },
  }).then(() => {
    searchResults.value = result.value
    setTimeout(() => {
      isSearching.value = false
    }, 500)
  })
}

// fired when the user presses enter
const onSearch = async (term) => {
  searchTerm.value = term
  searching()
}
// fired every time the search input is updated except with the enter key, this then detects if the field is empty && no year is selected, and to clear the results
const onUpdate = (event) => {
  searchTerm.value = event
  if (event === '' && searchYear.value === '') {
    // clear the results and use non-angolia episode component
    searchResults.value = null
  } else {
    // search disabled 7/18/2022 because every character update is equal to a search, and we are only limited to 10000/month in our free account
    // dont start search until search query is 3 characters or longer
    /* if (event.length >= 3) {
      // new search: reset pagination to 0
      searchPage.value = 0
      searching()
    } */
  }
}
// every time the user paginates, the method is called to update the page number in the Algolia search
const onUpdatePaginationInfo = (event) => {
  searchPage.value = event.page
  searching()
}
// every time the user selects a year filter, the method is called to update the filter in the Algolia search
const onYearFilter = (yearValue) => {
  const thisYear = isNaN(yearValue) ? '' : yearValue

  searchYear.value = thisYear
  // new search: reset pagination to 0
  searchPage.value = 0
  searching()
}
/*Algolia Search END*/
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Podcast | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="Podcast | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="Podcast | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <title-with-search
              title="Podcast"
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
      @search-page-event="onUpdatePaginationInfo"
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
