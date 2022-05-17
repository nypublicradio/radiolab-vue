<script setup>
import { useRuntimeConfig } from '#app'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
useMeta({
  bodyAttrs: {
    class: 'has-head-color',
  },
})
const dataLoaded = ref(false)
const page = ref([])
const router = useRouter()
const config = useRuntimeConfig()

onBeforeMount(async () => {
  await axios
    .get(
      `${config.API_URL}/api/v3/channel/shows/radiolab/new-cohosts-latif-nasser-lulu-miller`
    )
    .then((response) => {
      page.value = response.data.included[0].attributes
      dataLoaded.value = true
    })
    .catch(() => {
      router.push('/404')
    })
})
</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content thin-content-width">
        <template v-if="dataLoaded">
          <Html lang="en">
            <Head>
              <Title>{{ page.title }} | Radiolab | WNYC Studios</Title>
              <Meta
                name="og:title"
                :content="`${page.title} | Radiolab | WNYC Studios`"
              />
              <Meta
                name="twitter:title"
                :content="`${page.title} | Radiolab | WNYC Studios`"
              />
            </Head>
          </Html>
          <div class="html-formatting" v-html="page.body" />
        </template>
        <skeleton-general-content v-else />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-16);
}
</style>
