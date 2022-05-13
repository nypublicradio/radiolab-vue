<script setup>
import { onBeforeMount, ref } from 'vue'
//import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { bpSizes } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
//const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch(
  `${config.API_URL}/api/v3/channel/shows/radiolab/the-team/1?limit=50`
)
people.value = apiData.value.included
totalCount.value = apiData.value.data.attributes['total-count']

// onBeforeMount(async () => {
//   await axios
//     .get(
//       `${config.API_URL}/api/v3/channel/shows/radiolab/the-team/1?limit=50`
//       // `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/the-team/1?limit=50`
//     )
//     .then((response) => {
//       people.value = response.data.included
//       totalCount.value = response.data.data.attributes['total-count']
//       dataLoaded.value = true
//     })
// })
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>The Team | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="The Team | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="The Team | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2">The Team</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content lg:px-8 cards">
        <div v-if="!pending" class="grid">
          <div
            v-for="(person, index) in people"
            :key="`${person.attributes.person.name}-${index}`"
            class="col-12 md:col-6 xl:col-4 mb-6"
          >
            <client-only>
              <v-card
                :image="
                  person.attributes.person.image.template.replace(
                    '%s/%s/%s/%s',
                    '%width%/%height%/c/%quality%'
                  )
                "
                :alt="person.attributes.person.name"
                :title="person.attributes.person.name"
                :titleLink="`/team/${person.attributes.person.slug}`"
                :eyebrow="person.attributes['appearance-type']"
                :blurb="
                  person.attributes.person.lede || person.attributes.person.bio
                "
                :width="bpSizes('md', null, 370)"
                :height="bpSizes('md', null, 277)"
                :max-width="person.attributes.person.image.w"
                :max-height="person.attributes.person.image.h"
                responsive
                bp="max"
                class="radiolab-card team"
              />
            </client-only>
          </div>
        </div>
        <team-skeleton v-else :row-count="totalCount" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.team .cards > .grid {
  margin: 0 -24px;
}

.team .cards .grid > .col,
.team .cards .grid > [class*='col'] {
  padding: 0 24px;
}

.team .cards .card-eyebrow {
  text-transform: capitalize;
}
</style>
