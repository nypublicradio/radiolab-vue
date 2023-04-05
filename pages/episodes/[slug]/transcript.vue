<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import scssVars from '~/assets/scss/_exportedVariables.module.scss'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
const config = useRuntimeConfig()
const episode = ref([])

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

const {
  data: page,
  pending,
  error,
} = await useFetch(`${config.API_URL}/api/v3/story/${route.params.slug}/`)

episode.value = page.value.data.attributes

useHead({
  title: `${episode.value?.title} - Transcript`,
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
    { name: 'og:type', content: 'article' },
    { name: 'og:title', content: `${episode.value?.title} - Transcript` },
    { name: 'description', content: episode.value?.tease },
    { name: 'og:description', content: episode.value?.tease },
    { name: 'og:image', content: episode.value?.['image-main']?.url },
    { name: 'og:image:width', content: episode.value?.['image-main']?.w },
    { name: 'og:image:height', content: episode.value?.['image-main']?.h },
    { name: 'twitter:title', content: `${episode.value?.title} - Transcript` },
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
                <EpisodeHead
                  :pending="pending"
                  :episode="episode"
                  isTranscript
                />
              </div>
            </div>
            <div v-if="!pending" class="mt-5 relative">
              <div class="scrollTrigger" ref="scrollTrigger" />
              <div
                :class="[{ intersected: intersected }]"
                class="fixed-header flex gap-2 align-items-center"
              >
                <Button
                  label="Episode Details"
                  icon="pi pi-chevron-left"
                  class="p-button-rounded blue block"
                  @click="
                    () =>
                      router.push({
                        path: `/episodes/${episode.slug}`,
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
                      :src="
                        formatPublisherImageUrl(episode['image-main'].template)
                      "
                      :width="38"
                      :height="38"
                    />
                    <div class="font-bold">{{ episode.title }}</div>
                  </div>
                </Transition>
              </div>

              <div class="transcript-panel flex gap-2 md:gap-4">
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
  .fixed-header {
    position: sticky;
    top: $headerHeight;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    padding: 16px 0px;
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
    .fixed-image {
      border-radius: 6px;
      width: 36px;
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
