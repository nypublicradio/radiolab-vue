<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

useHead({
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const episode = ref([])

const route = useRoute()

const apiUrl = `${config.API_URL}/api/v3/channel/series/${route.params.slug}/`

onBeforeMount(async () => {
  await axios
    .get(apiUrl)
    .then((response) => {
      episode.value = response.data.data.attributes
      dataLoaded.value = true
    })
    .catch((error) => throwError(error))
})
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>Series | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="Series | Radiolab | WNYC Studios" />
        <Meta name="twitter:title" content="Series | Radiolab | WNYC Studios" />
      </Head>
    </Html>
    <section>
      <div class="content lg:px-8 pb-0">
        <div v-if="dataLoaded" class="grid">
          <div class="col">
            <h1 class="mb-4 h2">{{ episode.title }}</h1>
            <div class="html-formatting" v-html="episode.description" />
          </div>
        </div>
        <skeleton-general-content v-else />
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      :api="apiUrl"
      path="data.included"
      :paginate="true"
    />
  </div>
</template>
