<script setup>
import scssVars from '~/assets/scss/_exportedVariables.module.scss'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const intersected = ref(true)
const scrollTrigger = ref(null)
const scrollTriggerOffset = ref(
  Number(scssVars.headerHeight) + Number(scssVars.leaderboardHeightMobile)
)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        intersected.value = entry.isIntersecting
      })
    },
    { threshold: 1, rootMargin: `-${scrollTriggerOffset.value}px` }
  )
  observer.observe(scrollTrigger.value)
})

const { data, pending } = await useFetch(
  `${config.API_URL}/api/v2/show/episode/publisher/${route.params.slug}`
)

useHead({
  title: `${data.value?.title} - Transcript`,
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: `${data.value?.title} - Transcript` },
    { name: 'description', content: data.value?.tease },
    { name: 'og:description', content: data.value?.tease },
    { name: 'og:image', content: data.value?.image?.url },
    { name: 'og:image:width', content: data.value?.image?.w },
    { name: 'og:image:height', content: data.value?.image?.h },
    { name: 'twitter:title', content: `${data.value?.title} - Transcript` },
    { name: 'twitter:description', content: data?.value.tease },
    { name: 'twitter:image', content: data.value?.image?.url },
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
                <EpisodeHead :pending="pending" :episode="data" isTranscript />
              </div>
            </div>
            <div v-if="!pending" class="mt-5 relative">
              <div class="scrollTrigger" ref="scrollTrigger" />
              <div
                :class="[{ intersected: intersected }]"
                class="fixed-header flex flex-wrap gap-2 align-items-center flex-row"
              >
                <Button
                  label="Episode Details"
                  icon="pi pi-chevron-left"
                  class="p-button-rounded blue block episode-details-button"
                  @click="
                    () =>
                      router.push({
                        path: `/podcast/${data.meta.slug}`,
                      })
                  "
                />
                <Transition name="fade">
                  <div
                    class="flex gap-2 align-items-center"
                    v-if="!intersected"
                  >
                    <VSimpleResponsiveImage
                      class="fixed-image"
                      :src="formatPublisherImageUrl(data.image.template)"
                      :width="38"
                      :height="38"
                    />
                    <div class="font-bold">{{ data.title }}</div>
                  </div>
                </Transition>
              </div>

              <div class="transcript-panel flex gap-2 md:gap-4">
                <div class="right">
                  <div
                    v-if="data.transcript"
                    v-html="data.transcript"
                    class="transcript-body html-formatting"
                  />
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
.podcast-slug-transcript {
  .fixed-header {
    position: sticky;
    top: $headerHeight;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    padding: 0px 0px 16px 0px;
    &.intersected {
      position: relative;
      top: 0;
    }
    @include media('<md') {
      top: calc($headerHeight + $leaderboardHeightMobile);
      &.intersected {
        top: 0;
      }
    }
    .episode-details-button {
      padding-left: 0.5rem;
      @include media('<md') {
        font-size: 0.8rem;
        line-height: 1rem;
        .p-button-label {
          vertical-align: text-bottom;
        }
      }
    }
    .fixed-image {
      border-radius: 6px;
      width: 36px;
      min-width: 36px;
      height: 36px;
    }
  }
  .scrollTrigger {
    height: 0;
    pointer-events: none;
  }
  .transcript-panel {
    .left {
      min-width: 200px;
      @include media('<md') {
        min-width: 90px;
      }
    }
  }
  .episode-header {
    .p-button {
      @include media('<md') {
        font-size: 0.75rem;
        padding: 0.27rem 0.27rem;
        .p-button-label {
        }
      }
      .pi {
        @include media('<md') {
          font-size: 0.5rem;
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
