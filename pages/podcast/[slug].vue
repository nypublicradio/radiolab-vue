<script setup>
import gaEvent from '~/utilities/ga.js'
import { onMounted, ref } from 'vue'
import {
  formatDate,
  copyToClipBoard,
  formatPublisherImageUrl,
} from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()
const episode = ref( [] )
const imageCredits = ref( null )
const imageCreditsLink = ref( null )
const showTranscriptSidePanel = ref( false )

const route = useRoute()
const nuxtError = useError()

const {
  data: page,
  pending,
  error,
} = await useFetch( `${ config.API_URL }/api/v3/story/${ route.params.slug }/` )

episode.value = page.value.data.attributes

// if not a Radiolab show, route to 404
if ( episode.value.show !== 'radiolab' ) {
  nuxtError( {
    statusCode: 404,
    statusMessage: 'Page not found',
    message: 'Page not found',
  } )
}

imageCredits.value = episode.value[ 'image-main' ][ 'credits-name' ]
imageCreditsLink.value = episode.value[ 'image-main' ][ 'credits-url' ]

onMounted( () => {
  // when mounted and data is ready, if url query transcript exists, show transcript side panel
  if ( route.query.transcript ) onToggleTranscript()
} )

// copy transcript link to clipboard
const copyTranscriptLink = () => {
  copyToClipBoard(
    `${ window.location.href }${ route.query.transcript ? '' : '?transcript=true'
    }`,
    'Transcript link copied to clipboard'
  )
  gaEvent( 'Click Tracking', 'Episode Tools', 'Copy transcript link' )
}

// function to toggle transcript sidebar panel
const onToggleTranscript = () => {
  showTranscriptSidePanel.value = true
}

useHead( {
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
    { name: 'og:image', content: episode.value?.[ 'image-main' ]?.url },
    { name: 'og:image:width', content: episode.value?.[ 'image-main' ]?.w },
    { name: 'og:image:height', content: episode.value?.[ 'image-main' ]?.h },
    { name: 'twitter:title', content: episode.value?.title },
    { name: 'twitter:description', content: episode?.value.tease },
    { name: 'twitter:image', content: episode.value?.[ 'image-main' ]?.url },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
} )
</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content">
        <cms-edit-button :data="episode" label="Edit this Episode in the CMS" />
        <div class="grid">
          <div class="col-12 xl:col-8">
            <div class="grid">
              <div class="col">
                <div v-if="!pending" class="episode flex">
                  <client-only>
                    <v-image-with-caption
                      v-if="episode['image-main']"
                      :image="
                        formatPublisherImageUrl(episode['image-main'].template)
                      "
                      :width="200"
                      :height="200"
                      :alt="episode['image-main']['alt-text']"
                      :ratio="[1, 1]"
                      :sizes="[1]"
                      flat-quality
                      :max-width="episode['image-main'].w"
                      :max-height="episode['image-main'].h"
                      class="episode-image"
                    />
                  </client-only>
                  <div class="episode-content">
                    <p v-if="episode['publish-at']" class="date mb-1">
                      {{ formatDate(episode['publish-at']) }}
                    </p>
                    <div
                      class="h2 title mb-0 md:mb-4"
                      v-html="episode.title"
                    ></div>
                    <client-only>
                      <episode-tools
                        class="hidden md:block"
                        :episode="episode"
                        @toggleTranscript="onToggleTranscript"
                      />
                    </client-only>
                    <div
                      v-if="imageCredits"
                      class="mt-2 md:mt-3 footer type-body"
                    >
                      Image credits:
                      <v-flexible-link
                        class="inline"
                        :class="{ raw: !imageCreditsLink }"
                        :to="imageCreditsLink"
                        >{{ imageCredits }}
                      </v-flexible-link>
                    </div>
                  </div>
                </div>
                <episode-head-skeleton v-else />
                <client-only>
                  <episode-tools
                    v-if="!pending"
                    class="mt-3 block md:hidden"
                    :episode="episode"
                    @toggleTranscript="onToggleTranscript"
                  />
                  <episode-tools-skeleton v-else class="mt-3 block md:hidden" />
                </client-only>
              </div>
            </div>
            <div
              v-if="!pending"
              class="mt-5 html-formatting"
              v-html="episode.body"
            ></div>
            <episode-body-text-skeleton v-else class="mt-6" />
          </div>
          <div class="col-12 xl:col-3 xl:col-offset-1">
            <membership-promo class="mb-8" />
            <div class="htlad-radiolab_right_rail_1" />
          </div>
        </div>
      </div>
    </section>
    <client-only>
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
          <p class="date" v-if="episode['publish-at']">
            {{ formatDate(episode['publish-at']) }}
          </p>
          <div class="h2 title mb-0 md:mb-4" v-html="episode.title"></div>
        </div>
        <Divider />
        <div
          v-if="!!episode['transcript']"
          v-html="episode['transcript']"
          class="transcript-body mt-2 html-formatting"
        ></div>
      </Sidebar>
    </client-only>
    <div
      v-html="episode['transcript']"
      style="visibility: hidden; height: 0; overflow: hidden"
    ></div>
    <div class="htlad-radiolab_leaderboard_2 mb-8" />
  </div>
</template>

<style lang="scss">
.episodes-slug,
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
