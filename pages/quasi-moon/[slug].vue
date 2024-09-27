<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const person = ref([])
const route = useRoute()
// const router = useRouter()
onBeforeMount(async () => {
  await axios
    .get(
      `${config.API_URL}/api/v3/person/${route.params.slug}/`
      // `https://private-anon-d1d00d4480-nyprpublisher.apiary-proxy.com/api/v3/person/${route.params.slug}/`
    )
    .then((response) => {
      person.value = response.data.data.attributes
      dataLoaded.value = true
    })
    .catch(() => {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true,
      })
    })
})
</script>

<template>
  <div class="thin-content-width">
    <div v-if="dataLoaded">
      <Html lang="en">
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
              <h1 class="h2 mt-4 mb-2 font-normal">{{ person.name }}</h1>
              <h3 v-if="person['job-title']">{{ person['job-title'] }}</h3>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="content mb-4 pt-0">
          <div>
            <client-only>
              <v-card
                :image="formatPublisherImageUrl(person.image.template)"
                :width="800"
                :height="533"
                :alt="person.name"
                :max-width="person.image.w"
                :max-height="person.image.h"
                responsive
                :ratio="[3, 2]"
                :sizes="[1]"
                flat-quality
                bp="max"
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
