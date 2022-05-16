<script setup>
import { onBeforeMount, ref } from 'vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const episode = ref([])
const logo = ref('')

const route = useRoute()

const apiUrl = `${config.API_URL}/api/v3/channel/series/${route.params.slug}/`

onBeforeMount(async () => {
  await axios
    .get(apiUrl)
    .then((response) => {
      episode.value = response.data.data.attributes
      logo.value = response.data.data.attributes['logo-image']
      console.log('response', response)
      dataLoaded.value = true
    })
    .catch((error) => throwError(error))
})
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>Series | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="Series | Radiolab | WNYC Studios" />
        <Meta name="twitter:title" content="Series | Radiolab | WNYC Studios" />
      </Head>
    </Html>
    <section>
      <div class="content lg:px-8 pb-0">
        <div v-if="dataLoaded" class="grid">
          <div class="col">
            <div class="series-logo-title mb-4">
              <client-only>
                <v-image-with-caption
                  :image="
                    logo.template.replace(
                      '%s/%s/%s/%s',
                      '%width%/%height%/c/%quality%'
                    )
                  "
                  :alt="
                    logo['alt-text'] ? logo['alt-text'] : 'Series logo image'
                  "
                  :width="100"
                  :height="100"
                  :max-width="logo.w"
                  :max-height="logo.h"
                  :ratio="[1, 1]"
                  :sizes="[2]"
                />
              </client-only>
              <h1 class="h2">
                {{ episode.title }}
              </h1>
            </div>

            <div class="html-formatting" v-html="episode.description" />
          </div>
        </div>
        <skeleton-general-content v-else />
      </div>
    </section>
    <episodes class="mb-4" :api="apiUrl" path="data.included" bucket />
  </div>
</template>

<style lang="scss" scoped>
.series-logo-title {
  display: flex;
  gap: 1rem;
  justify-items: start;
  align-items: center;
  justify-items: flex-start;
  @include media('<sm') {
    flex-direction: column;
    align-items: flex-start;
  }
  .image-with-caption {
    width: 100px;
    height: 100px;
  }
}
</style>
