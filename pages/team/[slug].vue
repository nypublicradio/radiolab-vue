<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import Skeleton from 'primevue/skeleton'
import { bpSizes } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const person = ref([])
const route = useRoute()
const router = useRouter()

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch(`${config.API_URL}/api/v3/person/${route.params.slug}/`)
//console.log('apiData.value = ', apiData.value.data.attributes)
person.value = apiData.value.data.attributes
</script>

<template>
  <div class="thin-content-width">
    <div v-if="!pending">
      <Html>
        <Head>
          <Title>{{ person.name }} | Radiolab | WNYC Studios</Title>
          <Meta
            name="og:title"
            :content="`${person.name} | Radiolab | WNYC Studios`"
          />
          <Meta name="og:image" :content="person.image.url" />
          <Meta name="og:image:width" :content="`${person.image.w}`" />
          <Meta name="og:image:height" :content="`${person.image.h}`" />
          <Meta
            name="twitter:title"
            :content="`${person.name} | Radiolab | WNYC Studios`"
          />
          <Meta name="twitter:image" :content="person.image.url" />
        </Head>
      </Html>
      <section class="mb-5">
        <div class="content pb-0">
          <div class="grid">
            <div class="col-12">
              <h1 class="h2 mt-4 mb-2">{{ person.name }}</h1>
              <h3 v-if="person['job-title']">{{ person['job-title'] }}</h3>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="content mb-4 pt-0">
          <div>
            <client-only>
              <v-image-with-caption
                :image="
                  person.image.template.replace(
                    '%s/%s/%s/%s',
                    '%width%/%height%/c/%quality%'
                  )
                "
                :width="bpSizes('md', null, 736)"
                :height="bpSizes('md', null, 460)"
                :alt="person.name"
                :max-width="person.image.w"
                :max-height="person.image.h"
                class="mb-6"
              />
            </client-only>
            <div
              v-html="person.bio || person.lede"
              class="team-bio html-formatting"
            />
          </div>
        </div>
      </section>
    </div>
    <skeleton-general-content v-else />
  </div>
</template>

<style lang="scss"></style>
