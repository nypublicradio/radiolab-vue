<script setup>
import { useEpisodePageTrackingData } from '~/utilities/metadata.ts'
const { $analytics } = useNuxtApp()
const config = useRuntimeConfig()
const episode = ref([])
const route = useRoute()

const { data, pending } = await useFetch(
  `${config.API_URL}/api/v2/show/episode/publisher/${route.params.slug}`
)

const trackingData = useEpisodePageTrackingData(data.value)

// if not a Radiolab show, route to 404
// const showsToInclude = ['radiolab', 'radiolab-kids']
// if (showsToInclude.indexOf(data.value.show) === -1) {
//   nuxtError({
//     statusCode: 404,
//     statusMessage: 'Page not found',
//     message: 'Page not found',
//   })
// }

useHead({
  title: data.value?.title,
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: data.value?.title },
    { name: 'description', content: data.value?.tease },
    { name: 'og:description', content: data.value?.tease },
    { name: 'og:image', content: data.value?.['image-main']?.url },
    { name: 'og:image:width', content: data.value?.['image-main']?.w },
    { name: 'og:image:height', content: data.value?.['image-main']?.h },
    { name: 'twitter:title', content: data.value?.title },
    { name: 'twitter:description', content: episode?.value.tease },
    { name: 'twitter:image', content: data.value?.['image-main']?.url },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})
onMounted(() => {
  $analytics.sendPageView(trackingData)
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
                <EpisodeHead :pending="pending" :episode="data" />
              </div>
            </div>
            <div
              v-if="!pending"
              class="mt-5 html-formatting"
              v-html="data.body"
            />
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
.podcast-slug {
  .cms-edit-button {
    position: absolute;
    padding: 0.5rem;
    z-index: 10;
  }
  .episode {
    align-items: center;

    .episode-image {
      margin-right: 1.5rem;
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;

      @include media('<lg') {
        margin-right: 1rem;
      }

      @include media('<md') {
        margin-right: 0.75rem;
        width: 90px;
        height: 90px;
        border-radius: 20px;
        min-width: 90px;
        min-height: 90px;
      }
    }

    .episode-content {
      flex-grow: 1;

      .date {
        font-size: var(--font-size-5);
        text-transform: uppercase;
        line-height: normal;

        @include media('<md') {
          font-size: var(--font-size-3);
        }
      }

      .title {
        font-size: var(--font-size-12);
        line-height: var(--font-size-13);
        font-weight: 500;

        @include media('<md') {
          font-size: var(--font-size-8);
          line-height: var(--font-size-9);
        }
      }
    }
  }

  .wide {
    @include media('<md') {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }
}
</style>
