<script setup>
import { useRuntimeConfig } from '#app'
import { ref } from 'vue'
useMeta({
  bodyAttrs: {
    class: 'has-head-color',
  },
})
const page = ref([])
const router = useRouter()
const config = useRuntimeConfig()

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch(
  `${config.API_URL}/api/v3/channel/shows/radiolab/radiolab-read-credit`
)
page.value = apiData.value.included[0].attributes
</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content thin-content-width">
        <template v-if="!pending">
          <Html>
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

<style lang="scss"></style>
