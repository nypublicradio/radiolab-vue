<script setup>
import { onBeforeMount, ref } from "vue"
import axios from "axios"
import VCard from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue"
import { formatPublisherImageUrl } from "~/utilities/helpers"
import { useRuntimeConfig } from "#app"
import teamData from "./team-data"

import VFlexibleLink from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue"
import colors from "~/assets/scss/colors.module.scss"
useHead({
  meta: [
    {
      name: "theme-color",
      content: colors.rlBlue,
    },
  ],
  bodyAttrs: {
    class: "has-head-color quasi-moon invert-menu-color",
  },
})
const { $analytics } = useNuxtApp()

console.log("teamData", teamData)
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
  people.value = teamData.included
  totalCount.value = teamData.data.attributes["total-count"]
  dataLoaded.value = true
})

const goToPersonPage = (slug) => {
  if (slug) {
    window.open(slug, "_blank")
  }
}
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Name a Quasi-moon Contest | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Name a Quasi-moon Contest | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:title"
          content="Name a Quasi-moon Contest | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section
      class="quasi-moon graphic-head-bg flex justify-content-center align-content-center"
    >
      <div
        class="flex flex-column justify-content-center align-content-center pb-8 shape-holder"
      >
        <img src="/shape_result.webp" class="shape" />
        <h1 class="title h2 gold text-center lg:text-7xl">Name a Quasi-Moon</h1>
      </div>
    </section>
    <section class="below-head -mt-8">
      <div class="content py-0">
        <h4 class="gold md:px-8">
          An oppertunity to rays ephemeris zodiac cosmology red shift azimuth perigee
          inertia exoplanet radiant gravity deep space white dwarf
        </h4>
      </div>
    </section>
    <section class="count-down px-2 py-6 lg:p-8">
      <h2 class="text-center text-white font-normal">Voting begins in...</h2>
      <CountDown :targetDate="new Date('2024-11-01T00:00:00')" />
    </section>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 font-normal text-white">Meet the Panel</h1>
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
            :class="[{ 'cursor-pointer': person.attributes.person.slug }]"
            @click="goToPersonPage(person.attributes.person.slug)"
          >
            <client-only>
              <v-card
                :image="formatPublisherImageUrl(person.attributes.person.image.template)"
                :width="320"
                :height="240"
                :alt="person.attributes.person.name"
                :title="person.attributes.person.name"
                :titleLink="`/quasi-moon/${person.attributes.person.slug}`"
                :eyebrow="person.attributes['appearance-type']"
                :blurb="person.attributes.person.lede || person.attributes.person.bio"
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
  color: #ffffff;
  padding: 2rem 0;
}
.quasi-moon {
  .graphic-head-bg {
    background-color: #000000;
    background-image: url("/stars_result.webp");
    background-position: center bottom;
    background-size: cover;
    background-size: cover;
    .shape-holder {
      width: 100%;
      background-color: #00000080;
    }
    .title {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }
    .shape {
      width: 100%;
      max-width: 430px;
      margin: 0 auto;
      opacity: 0.5;
    }
  }

  .below-head {
    h4 {
      font-weight: var(--font-weight-400);
      font-size: var(--font-size-10);
      line-height: var(--font-size-13);
      text-align: center;
      letter-spacing: 10px;
      @include media("<md") {
        font-size: var(--font-size-6);
        line-height: var(--font-size-9);
        letter-spacing: 6px;
      }
    }
  }

  .gold {
    color: #fff322;
  }

  .team .cards > .grid {
    margin: 0 -24px;
  }

  .team .cards .grid > .col,
  .team .cards .grid > [class*="col"] {
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
}
</style>