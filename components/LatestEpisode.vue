<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import PlaySelector from '~/components/PlaySelector.vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const episodes = ref([])

onBeforeMount(async () => {
  await axios
    .get(
      `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/1?limit=1`
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
})
</script>

<template>
  <div>
    <section>
      <div class="content px-3 pt-2">
        <div class="grid">
          <div class="col">
            <div v-if="dataLoaded" class="latest-episode grid grid-nogutter">
              <div class="col-12 md:col-7 lg:7 p-0">
                <client-only>
                  <v-image-with-caption
                    :image="
                      episodes[0].attributes['image-main'].template.replace(
                        '%s/%s/%s/%s',
                        '%width%/%height%/c/%quality%'
                      )
                    "
                    :width="778"
                    :height="545"
                    :imageUrl="`/episodes/${episodes[0].attributes.slug}`"
                    :alt="episodes[0].attributes['image-main']['alt-text']"
                    :max-width="episodes[0].attributes['image-main'].w"
                    :max-height="episodes[0].attributes['image-main'].h"
                    class="latest-episode-image"
                    :ratio="[8, 5.6]"
                    :sizes="[1]"
                  />
                </client-only>
              </div>
              <div
                class="latest-episode-content flex flex-column justify-content-center col-12 md:col-5 p-4 lg:p-5 xl:p-7"
              >
                <div>
                  <h5 class="mb-0 lg:mb-2">Latest Episode</h5>
                  <v-flexible-link
                    :to="`/episodes/${episodes[0].attributes.slug}`"
                    class="latest-episode-title inline-block"
                  >
                    <div
                      class="pb-1 mb-2 lg:mb-3 h2 truncate t2lines"
                      v-html="episodes[0].attributes.title"
                    ></div>
                  </v-flexible-link>
                  <div
                    v-html="episodes[0].attributes.tease"
                    class="latest-episode-tease mb-5 html-formatting type-body truncate t3lines"
                  ></div>
                  <div class="block md:hidden divider"></div>
                  <client-only>
                    <play-selector :episode="episodes[0].attributes" />
                  </client-only>
                </div>
              </div>
            </div>
            <latest-episode-skeleton v-else />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.latest-episode {
  max-width: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.latest-episode .latest-episode-title {
  text-decoration: none;

  @include media('<lg') {
    .h2 {
      font-size: var(--font-size-12);
      line-height: var(--line-height-12);
    }
  }
}

.latest-episode .latest-episode-image {
  //max-height: 500px;
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
  .image-with-caption-wrapper,
  .image-with-caption-image,
  .simple-responsive-image-holder {
    height: 100%;
    overflow: hidden;
  }
}

.latest-episode .latest-episode-content {
  background: var(--white100);
}

.latest-episode-tease {
  line-height: 24px;
}
</style>
