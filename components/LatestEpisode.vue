<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'
const { $analytics } = useNuxtApp()
const config = useRuntimeConfig()

// track clicks on the cards
const onCardClick = (episode, elm) => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: `Hero Episode Card - ${elm}`,
    event_label: episode.title,
  })
}

const { data, pending } = await useFetch(
  `${config.API_URL}/api/show/radiolab?pageSize=1`
)
</script>

<template>
  <div>
    <section>
      <div class="content px-3 pt-2">
        <div class="grid">
          <div class="col">
            <div v-if="!pending" class="latest-episode grid grid-nogutter">
              <div class="col-12 md:col-7 lg:7 p-0">
                <client-only>
                  <v-image-with-caption
                    :image="
                      formatPublisherImageUrl(
                        data.episodes.data[0].image.template
                      )
                    "
                    :width="778"
                    :height="545"
                    :imageUrl="`/podcast/${data.episodes.data[0].meta.slug}`"
                    :alt="data.episodes.data[0].image['alt-text']"
                    :max-width="data.episodes.data[0].image.w"
                    :max-height="data.episodes.data[0].image.h"
                    class="latest-episode-image"
                    :ratio="[8, 5.6]"
                    :sizes="[1]"
                    @image-click="onCardClick(data.episodes.data[0], 'image')"
                    :isDecorative="true"
                  />
                </client-only>
              </div>
              <div
                class="latest-episode-content flex flex-column justify-content-center col-12 md:col-5 p-4 lg:p-5 xl:p-7"
              >
                <div>
                  <h5 class="mb-0 lg:mb-2">Latest Episode</h5>
                  <v-flexible-link
                    :to="`/podcast/${data.episodes.data[0].meta.slug}`"
                    class="latest-episode-title inline-block"
                    @click="onCardClick(data.episodes.data[0], 'title')"
                  >
                    <div
                      class="pb-1 mb-2 lg:mb-3 h2 truncate t2lines"
                      v-html="data.episodes.data[0].title"
                    ></div>
                  </v-flexible-link>
                  <div
                    v-html="data.episodes.data[0].tease"
                    class="latest-episode-tease mb-5 html-formatting type-body truncate t3lines"
                  ></div>
                  <div class="block md:hidden divider"></div>
                  <client-only>
                    <play-selector :episode="data.episodes.data[0]" />
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
