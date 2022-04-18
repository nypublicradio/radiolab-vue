<script setup>
import { onBeforeMount, computed, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import axios from 'axios'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import EpisodeTools from '~/components/EpisodeTools.vue'
useHead({
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
      dataLoaded.value = true
    })
    .catch((error) => {
      if (error.response.status === 404) {
        navigateTo('/404')
      } else {
        navigateTo('/500')
      }
    })
})

const isMobile = computed(() => {
  return window.innerWidth < breakpoint['md']
})

</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content p-3 md:p-5 lg:p-6">
        <div class="grid">
          <div class="col-12 xl:col-8">
            <div class="grid">
              <div class="col">
                <div v-if="dataLoaded" class="episode flex">
                  <Html>
                    <Head>
                      <Title>{{ episode.title }} | Radiolab | WNYC Studios</Title>
                      <Meta name="description" :content="episode.tease" />
                      <Meta
                        name="og:title"
                        :content="`${episode.title} | Radiolab | WNYC Studios`"
                      />
                      <Meta name="og:description" :content="episode.tease" />
                      <Meta name="og:type" content="article" />
                      <Meta name="og:image" :content="episode['image-main'].url" />
                      <Meta name="og:image:width" :content="`${episode['image-main'].w}`" />
                      <Meta name="og:image:height" :content="`${episode['image-main'].h}`" />
                      <Meta
                        name="twitter:title"
                        :content="`${episode.title} | Radiolab | WNYC Studios`"
                      />
                      <Meta name="twitter:description" :content="episode.tease" />
                      <Meta name="twitter:image" :content="episode['image-main'].url" />
                    </Head>
                  </Html>
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
            <p v-if="dataLoaded" class="mt-5 html-formatting" v-html="episode.body" />
            <episode-body-text-skeleton v-else class="mt-6" />
          </div>
          <div class="col-12 xl:col-3 xl:col-offset-1">
            <membership-promo />
          </div>
        </div>
      </div>
    </section>
    <div v-html="episode['transcript']" style="visibility:hidden; height:0; overflow:hidden;"></div>
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
      @include media("<lg") {
        margin-right: 1rem;
      }
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
  .wide {
    @include media("<md") {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }
}
</style>