<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

onBeforeMount(async () => {
  await axios
    .get(`${config.API_URL}/api/team/publisher/radiolab`)
    .then((response) => {
      people.value = response.data.included
      totalCount.value = response.data.data.attributes['total-count']
      dataLoaded.value = true
    })
})
</script>

<template>
  <div>
    <Html lang="en">
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
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 font-normal">The Team</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content xl:px-8 cards">
        <div v-if="dataLoaded" class="grid">
          <div
            v-for="(person, index) in people"
            :key="`${person.attributes.person.name}-${index}`"
            class="col-12 sm:col-6 lg:col-4 mb-6"
          >
            <client-only>
              <v-card
                :image="
                  formatPublisherImageUrl(
                    person.attributes.person.image.template
                  )
                "
                :max-width="person.attributes.person.image.w"
                :max-height="person.attributes.person.image.h"
                :alt="person.attributes.person.name"
                :title="person.attributes.person.name"
                :titleLink="`/team/${person.attributes.person.slug}`"
                :eyebrow="person.attributes['appearance-type']"
                :blurb="
                  person.attributes.person.lede || person.attributes.person.bio
                "
                :width="320"
                :height="240"
                :ratio="[3, 2]"
                :sizes="[2]"
                flat-quality
                responsive
                bp="max"
                class="radiolab-card team"
              />
            </client-only>
          </div>
        </div>
        <team-skeleton v-else :row-count="30" />
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
