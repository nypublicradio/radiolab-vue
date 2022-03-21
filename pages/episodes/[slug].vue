<script setup>
import { onBeforeMount, onMounted, computed, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import EpisodeTools from '~/components/EpisodeTools.vue'
useMeta({
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
      // console.log('episode.value = ', episode.value)
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
      <div class="content p-3">
        <div class="grid">
          <div class="col-12 md:col-8">
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
                    <p class="date">{{ formatDate(episode['publish-at']) }}</p>
                    <h2 class="title" v-html="episode.title" />
                    <episode-tools class="hidden md:block">episode tools</episode-tools>
                  </div>
                </div>
                <skeleton v-else />
                <episode-tools class="block md:hidden">episode tools</episode-tools>
              </div>
              <p v-html="episode.tease" />
            </div>
          </div>
          <div class="col-12 md:col-3 col-offset-0 md:col-offset-1">side grey</div>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="content p-6">
        <div class="grid">
          <div v-if="dataLoaded" class="col">
            <p v-html="episode.tease" />
          </div>
          <skeleton v-else />
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
        width: 90px;
        height: 90px;
        border-radius: 20px;
      }
    }
    .episode-content {
      .date {
        font-size: var(--font-size-5);
        text-transform: uppercase;
        line-height: normal;
      }
      .title {
        font-size: var(--font-size-12);
        line-height: var(--font-weight-13);
        font-weight: 500;
      }
    }
  }
}
</style>