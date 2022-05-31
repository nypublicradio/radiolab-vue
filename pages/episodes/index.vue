<script setup>
import { useRuntimeConfig } from '#app'
import TitleWithSearch from '~/components/TitleWithSearch.vue'
import { ref, watch } from 'vue'

const { result, search } = useSearch('Radiolab Demo') // pass your index name as param
const searchTerm = ref('')
const searchResults = ref(null)
const isSearching = ref(false)

// fired when the user presses enter or searches in the input textfield whitch triggers a Algolia search and controls the loading icon spinner state
const onSearch = async (event) => {
  console.log('search for = ', event)
  searchTerm.value = event
  isSearching.value = true
  await search({ query: event })
}
// fired every time the search input is updated except with the enter key, this then detects if the field is empty, and to clear the results
const onUpdate = (event) => {
  if (event === '') {
    searchResults.value = null
  }
}

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`

// watches for new search results and updates
watch(result, (res) => {
  console.log('results', res)
  searchResults.value = res
  setTimeout(() => {
    isSearching.value = false
  }, 500)
})
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
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <title-with-search
              title="Episode Archive"
              placeholder="Search by topic, guest, host"
              :isSearching="isSearching"
              @search="onSearch"
              @update="onUpdate"
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
