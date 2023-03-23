<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const episode = ref([])
const imageCredits = ref(null)
const imageCreditsLink = ref(null)

const route = useRoute()

const {
  data: page,
  pending,
  error,
} = await useFetch(`${config.API_URL}/api/v3/story/${route.params.slug}/`)

episode.value = page.value.data.attributes
imageCredits.value = episode.value['image-main']['credits-name']
imageCreditsLink.value = episode.value['image-main']['credits-url']

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
            <div v-if="!pending" class="mt-5 transcript-panel">
              <div class="flex gap-4">
                <div class="left">button</div>
                <div class="right">
                  <div
                    v-if="!!episode['transcript']"
                    v-html="episode['transcript']"
                    class="transcript-body mt-2 html-formatting"
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
    .p-sidebar-header .p-sidebar-close {
      color: var(--black100);
      &:hover {
        background-color: var(--black100) !important;
        border-color: var(--black100) !important;
        .p-sidebar-close-icon {
          color: var(--white100);
        }
      }
    }
    @include media('>md') {
      &.p-sidebar-lg {
        width: 768px !important;
      }
    }
    @include media('<md') {
      &.p-sidebar-lg {
        width: 100% !important;
      }
    }
    .p-sidebar-content {
      margin-top: -64px;
      padding-right: spacing(8);
      .title {
        font-size: var(--font-size-12);
        line-height: var(--font-size-13);
        font-weight: 400;
        @include media('<md') {
          font-size: var(--font-size-8);
          line-height: var(--font-size-9);
        }
      }
    }
    .p-sidebar-header {
      padding: 0.9rem 1rem;
      .p-sidebar-close {
        z-index: 1;
        background: var(--white100);
      }
    }
  }
}
</style>
