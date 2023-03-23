<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const episode = ref([])

const route = useRoute()

const {
  data: page,
  pending,
  error,
} = await useFetch(`${config.API_URL}/api/v3/story/${route.params.slug}/`)

episode.value = page.value.data.attributes

useHead({
  title: episode.value?.title,
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: episode.value?.title },
    { name: 'description', content: episode.value?.tease },
    { name: 'og:description', content: episode.value?.tease },
    { name: 'og:image', content: episode.value?.['image-main']?.url },
    { name: 'og:image:width', content: episode.value?.['image-main']?.w },
    { name: 'og:image:height', content: episode.value?.['image-main']?.h },
    { name: 'twitter:title', content: episode.value?.title },
    { name: 'twitter:description', content: episode?.value.tease },
    { name: 'twitter:image', content: episode.value?.['image-main']?.url },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})
</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content">
        <div class="grid">
          <div class="col-12 xl:col-8">
            <div class="grid">
              <div class="col">
                <EpisodeHead :pending="pending" :episode="episode" />
              </div>
            </div>
            <div v-if="!pending" class="mt-5">
              <div class="transcript-panel flex gap-4">
                <div class="left relative">
                  <Button
                    label="Full Episode"
                    icon="pi pi-chevron-left"
                    class="p-button-rounded blue mx-auto block"
                  />
                </div>
                <div class="right">
                  <div
                    v-if="!!episode['transcript']"
                    v-html="episode['transcript']"
                    class="transcript-body html-formatting"
                  ></div>
                </div>
              </div>
            </div>
            <episode-body-text-skeleton v-else class="mt-6" />
          </div>
          <div class="col-12 xl:col-3 xl:col-offset-1">
            <membership-promo class="mb-8" />
            <div class="htlad-radiolab_right_rail_1" />
          </div>
        </div>
      </div>
    </section>
    <div class="htlad-radiolab_leaderboard_2 mb-8" />
  </div>
</template>

<style lang="scss">
.episodes-slug-transcript {
  .transcript-panel {
    .left {
      min-width: 200px;
    }
  }
}
</style>
