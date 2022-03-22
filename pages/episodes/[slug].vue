<script setup>
import { onBeforeMount, onMounted, computed, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import EpisodeTools from '~/components/EpisodeTools.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
useMeta({
  meta: [
    {
      name: 'theme-color',
      content: '#f4be2e',
    },
  ],
  bodyAttrs: {
    class: 'has-head-color'
  }
})
const dataLoaded = ref(false)
const episode = ref([])
const route = useRoute()

onBeforeMount(async () => {
  await axios
    .get(
      `https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/story/${route.params.slug}/`
    )
    .then((response) => {
      episode.value = response.data.data.attributes
      console.log('episode.value = ', episode.value)
      dataLoaded.value = true
    })
})

const isMobile = computed(() => {
  return window.innerWidth < breakpoint['md']
})

</script>

<template>
  <div class="episode-page page">
    <section class="head-color yellow">
      <div class="content p-3 md:p-6">
        <div class="grid">
          <div class="col-12 lg:col-8">
            <div class="grid">
              <div class="col">
                <div v-if="dataLoaded" class="episode flex">
                  <v-image-with-caption
                    :image="episode['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
                    :alt="episode['image-main']['alt-text']"
                    :width="isMobile ? 90 : 200"
                    :height="isMobile ? 90 : 200"
                    :max-width="episode['image-main'].w"
                    :max-height="episode['image-main'].h"
                    :ratio="[1, 1]"
                    class="episode-image"
                  />
                  <div class="episode-content">
                    <p class="date mb-1">{{ formatDate(episode['publish-at']) }}</p>
                    <h2 class="title mb-0 md:mb-4" v-html="episode.title" />
                    <episode-tools class="hidden md:block" :episode="episode" />
                  </div>
                </div>
                <episode-head-skeleton v-else />
                <episode-tools v-if="dataLoaded" class="mt-3 block md:hidden" :episode="episode" />
                <episode-tools-skeleton v-else class="mt-3 block md:hidden" />
              </div>
            </div>
            <p
              v-if="dataLoaded"
              class="wide pr-0 lg:pr-4 xl:pr-0 mt-6 html-formatting"
              v-html="episode.body"
            />
            <episode-body-text-skeleton v-else class="mt-6" />
          </div>
          <div class="col-12 lg:col-4 xl:col-3 col-offset-0 xl:col-offset-1">
            <div class="the-lab-box">
              <img class="mb-1" alt="THE LAB sticker" src="/the-lab-sticker-black.svg" />
              <h4 class="mb-4">Unlock member-only exclusives and support the show</h4>
              <h5>Exclusive Podcast Extras</h5>
              <h5>Entire Podcast Archive</h5>
              <h5>Listen Ad-Free</h5>
              <h5>Behind-the-Scenes Content</h5>
              <h5>Video Extras</h5>
              <h5>Original Music & Playlists</h5>
              <v-flexible-link raw to="/become-a-member">
                <Button class="p-button-rounded black mt-4">Become a member</Button>
              </v-flexible-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--     <section>
      <div class="content">
        <div class="grid">
          <div class="col">
            <p v-if="dataLoaded" v-html="episode.tease" />
          </div>
        </div>
      </div>
    </section>-->
  </div>
</template>

<style lang="scss">
.episode-page {
  .episode {
    align-items: center;
    .episode-image {
      margin-right: 1.5rem;
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      @include media("<md") {
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
        @include media("<md") {
          font-size: var(--font-size-3);
        }
      }
      .title {
        font-size: var(--font-size-12);
        line-height: var(--font-size-13);
        font-weight: 500;
        @include media("<md") {
          font-size: var(--font-size-8);
          line-height: var(--font-size-9);
        }
      }
    }
  }
  .the-lab-box {
    background-color: var(--primary-color);
    border-radius: 20px;
    padding: 40px;
    img {
      width: 100px;
      height: auto;
    }
    h5 {
      margin-bottom: 0.4rem;
      font-size: var(--font-size-2);
    }
  }
  .wide {
    @include media("<md") {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }
}
</style>