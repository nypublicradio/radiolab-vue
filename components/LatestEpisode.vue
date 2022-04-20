<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import PlaySelector from '~/components/PlaySelector.vue'
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const dataLoaded = ref( false )
const episodes = ref( [] )

onBeforeMount( async () => {
  await axios
    .get(
      // `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/1?limit=1`
      `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/1?limit=1`
    )
    .then( ( response ) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    } )
} )
</script>
 
<template>
  <div>
    <section>
      <div class="content px-3 pt-2">
        <div class="grid">
          <div class="col">
            <div v-if=" dataLoaded " class="latest-episode grid grid-nogutter">
              <div class="col-12 md:col-7 p-0">
                <v-image-with-caption
                  :image=" episodes[ 0 ].attributes[ 'image-main' ].template.replace( '%s/%s/%s/%s', '%width%/%height%/c/%quality%' ) "
                  :imageUrl=" `/episodes/${ episodes[ 0 ].attributes.slug }` "
                  :alt=" episodes[ 0 ].attributes[ 'image-main' ][ 'alt-text' ] "
                  :max-width=" episodes[ 0 ].attributes[ 'image-main' ].w "
                  :max-height=" episodes[ 0 ].attributes[ 'image-main' ].h " :ratio=" [ 8, 6 ] "
                  class="latest-episode-image" />
              </div>
              <div class="latest-episode-content col-12 md:col-5 p-4 lg:p-7">
                <h5 class="mb-0 lg:mb-2">Latest Episode</h5>
                <v-flexible-link :to=" `/episodes/${ episodes[ 0 ].attributes.slug }` "
                  class="latest-episode-title inline-block">
                  <h2 class="mb-2 lg:mb-3 truncate t2lines" v-html=" episodes[ 0 ].attributes.title "></h2>
                </v-flexible-link>
                <p v-html=" episodes[ 0 ].attributes.tease " class="latest-episode-tease mb-5 truncate t3lines" />
                <play-selector :episode=" episodes[ 0 ] " />
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

  @include media("<lg") {
    h2 {
      font-size: var(--font-size-12);
      line-height: var(--line-height-12);
    }
  }
}

.latest-episode .latest-episode-image {
  max-height: 500px;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
}

.latest-episode .latest-episode-content {
  background: var(--white100);
}

.latest-episode-tease {
  line-height: 24px;
}
</style>