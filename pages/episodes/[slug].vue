<script setup>
import gaEvent from '~/utilities/ga.js'
import { onMounted, computed, ref } from 'vue'
import { formatDate, copyToClipBoard } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'

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
const showTranscriptSidePanel = ref(false)

const route = useRoute()
const router = useRouter()

const {
  data: page,
  pending,
  error,
} = await useAsyncData('page', () =>
  $fetch(`${config.API_URL}/api/v3/story/${route.params.slug}/`)
)

// if (error) {
//   router.push('/404')
// }

episode.value = page.value.data.attributes

onMounted(() => {
  // when mounted and data is ready, if url query transcript exists, show transcript side panel
  if (route.query.transcript) onToggleTranscript()
})

const isMobile = computed(() => {
  return window.innerWidth < breakpoint['md']
})

// copy transcript link to clipboard
const copyTranscriptLink = () => {
  copyToClipBoard(
    `${window.location.href}${
      route.query.transcript ? '' : '?transcript=true'
    }`,
    'Transcript link copied to clipboard'
  )
  gaEvent('Click Tracking', 'Episode Tools', 'Copy transcript link')
}

// function to toggle transcript sidebar panel
const onToggleTranscript = () => {
  showTranscriptSidePanel.value = true
}
</script>

<template>
  <div>
    {{ episode }}
    <section class="head-color yellow">
      <div class="content p-3 md:p-5 lg:p-6">
        <div class="grid">
          <div class="col-12 xl:col-8">
            <div class="grid">
              <div class="col">
                <div v-if="!pending" class="episode flex">
                  <Html>
                    <Head>
                      <Title
                        >{{ episode.title }} | Radiolab | WNYC Studios</Title
                      >
                      <Meta name="description" :content="episode.tease" />
                      <Meta
                        name="og:title"
                        :content="`${episode.title} | Radiolab | WNYC Studios`"
                      />
                      <Meta name="og:description" :content="episode.tease" />
                      <Meta name="og:type" content="article" />
                      <Meta
                        name="og:image"
                        :content="episode['image-main'].url"
                      />
                      <Meta
                        name="og:image:width"
                        :content="`${episode['image-main'].w}`"
                      />
                      <Meta
                        name="og:image:height"
                        :content="`${episode['image-main'].h}`"
                      />
                      <Meta
                        name="twitter:title"
                        :content="`${episode.title} | Radiolab | WNYC Studios`"
                      />
                      <Meta
                        name="twitter:description"
                        :content="episode.tease"
                      />
                      <Meta
                        name="twitter:image"
                        :content="episode['image-main'].url"
                      />
                    </Head>
                  </Html>
                  <v-image-with-caption
                    :image="
                      episode['image-main'].template.replace(
                        '%s/%s/%s/%s',
                        '%width%/%height%/c/%quality%'
                      )
                    "
                    :alt="episode['image-main']['alt-text']"
                    :width="isMobile ? 90 : 200"
                    :height="isMobile ? 90 : 200"
                    :max-width="episode['image-main'].w"
                    :max-height="episode['image-main'].h"
                    :ratio="[1, 1]"
                    class="episode-image"
                  />
                  <div class="episode-content">
                    <p class="date mb-1">
                      {{ formatDate(episode['publish-at']) }}
                    </p>
                    <h2 class="title mb-0 md:mb-4" v-html="episode.title" />
                    <episode-tools
                      class="hidden md:block"
                      :episode="episode"
                      @toggleTranscript="onToggleTranscript"
                    />
                  </div>
                </div>
                <episode-head-skeleton v-else />
                <episode-tools
                  v-if="!pending"
                  class="mt-3 block md:hidden"
                  :episode="episode"
                  @toggleTranscript="onToggleTranscript"
                />
                <episode-tools-skeleton v-else class="mt-3 block md:hidden" />
              </div>
            </div>
            <p
              v-if="!pending"
              class="mt-5 html-formatting"
              v-html="episode.body"
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
    <Sidebar
      v-if="!pending"
      v-model:visible="showTranscriptSidePanel"
      class="transcript-panel p-sidebar-lg"
      :baseZIndex="1000"
      position="right"
    >
      <div class="flex align-items-center mt-3">
        <h5>Transcript</h5>
        <Button
          icon="pi pi-link"
          class="p-button-sm p-button-rounded ml-1"
          @click="copyTranscriptLink"
          aria-label="copy transcript link"
          title="Copy transcript link"
        />
      </div>
      <Divider />
      <div class="my-5">
        <p class="date">{{ formatDate(episode['publish-at']) }}</p>
        <h2 class="title mb-0 md:mb-4" v-html="episode.title" />
      </div>
      <Divider />
      <div
        v-if="!!episode['transcript']"
        v-html="episode['transcript']"
        class="transcript-body mt-2 html-formatting"
      ></div>
    </Sidebar>
    <div
      v-html="episode['transcript']"
      style="visibility: hidden; height: 0; overflow: hidden"
    ></div>
    <div class="htlad-radiolab_leaderboard_2 mb-8" />
  </div>
</template>

<style lang="scss">
.episodes-slug {
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
.transcript-panel {
  background-color: var(--primary-color);
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
</style>
