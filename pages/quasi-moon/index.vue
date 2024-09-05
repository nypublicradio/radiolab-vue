<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { formatPublisherImageUrl } from '~/utilities/helpers'
import { useRuntimeConfig } from '#app'
import teamData from './team-data'

import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import colors from '~/assets/scss/colors.module.scss'
useHead({
  meta: [
    {
      name: 'theme-color',
      content: colors.rlBlue,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color quasi-moon invert-menu-color',
  },
})
const { $analytics } = useNuxtApp()

console.log('teamData', teamData)
const config = useRuntimeConfig()
const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

onMounted(async () => {
  // await axios
  //   .get(
  //     `${config.API_URL}/api/v3/channel/shows/radiolab/the-team/1?limit=50`
  //     // `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/the-team/1?limit=50`
  //   )
  //   .then((response) => {
  //     people.value = response.data.included
  //     totalCount.value = response.data.data.attributes['total-count']
  //     dataLoaded.value = true
  //   })
  people.value = teamData.included;
  totalCount.value = teamData.data.attributes['total-count'];
  dataLoaded.value = true;
})

const goToPersonPage = (slug) => {
  if(slug){window.open(slug, "_blank")}
}
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Name a Quasi-moon Contest | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="Name a Quasi-moon Contest | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="Name a Quasi-moon Contest | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <!-- <section class="quasi-moon graphic-head flex justify-content-center align-content-center"> -->
    <section class="quasi-moon">
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 font-normal quasi-moon">Name A Quasi-Moon</h1>
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
            :class="[{'cursor-pointer': person.attributes.person.slug}]"
            @click="goToPersonPage(person.attributes.person.slug)"
          >
            <client-only>
              <v-card
                :image="
                  formatPublisherImageUrl(
                    person.attributes.person.image.template
                  )
                "
                :width="320"
                :height="240"
                :alt="person.attributes.person.name"
                :title="person.attributes.person.name"
                :titleLink="`/quasi-moon/${person.attributes.person.slug}`"
                :eyebrow="person.attributes['appearance-type']"
                :blurb="
                  person.attributes.person.lede || person.attributes.person.bio
                "
                :max-width="person.attributes.person.image.w"
                :max-height="person.attributes.person.image.h"
                :ratio="[3, 2]"
                :sizes="[2]"
                flat-quality
                responsive
                bp="max"
                class="radiolab-card quasi-moon team"
              />
            </client-only>
          </div>
        </div>
        <team-skeleton v-else :row-count="30" />
        <section class="alone">
          <img
            src="https://cdn.mos.cms.futurecdn.net/wtwfXHFQMXnuEMNMkfprSE.gif"
            alt="The trajectory of the quasi-moon"
          />
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="scss">

.has-head-color.quasi-moon {
  background-color: #000000;
  color: #FFFFFF;
  padding: 2rem 0;
  // .content {
  //   max-width: 1200px;
  //   margin: 0 auto;
  // }
}

.graphic-head {
    background-color: #000000;
    background-image: url('/rl-icon-on-blue2.svg');
  }

.h2.quasi-moon {
  color: #FFFFFF;
}

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

.team .card-details {
  justify-content: flex-start !important;
  .card-blurb {
    -webkit-line-clamp: unset !important;
  }
}

.radiolab-card.quasi-moon {
  pointer-events: none;
  .card-details {
    justify-content: flex-start !important;
    .card-blurb {
      -webkit-line-clamp: unset !important;
    }
  }
}
</style>
