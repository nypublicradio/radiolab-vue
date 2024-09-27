<script setup>
// import { onBeforeMount, ref } from "vue"
import VCard from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue"
// import { formatPublisherImageUrl } from "~/utilities/helpers"
// import { useRuntimeConfig } from "#app"
import teamData from "./team-data"

// import VFlexibleLink from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue"
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

// const config = useRuntimeConfig()
const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

onMounted( () => {
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

// Goes to the person page URL
// const goToPersonPage = (slug) => {
//   if (slug) {
//     window.open(slug, "_blank")
//   }
// }
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
          name="og:description"
          content="Welcome to Name a Quasi Moon - a global naming contest from Radiolab and the International Astronomical Union,
          Vote on the finalists starting in November and make your mark on the heavens!"
        />
        <Meta
          name="og:image"
          content="https://media.wnyc.org/i/raw/2024/09/ZoozveOG.png"
        />
        <Meta
          name="twitter:title"
          content="Name a Quasi-moon Contest | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:description"
          content="Welcome to Name a Quasi Moon - a global naming contest from Radiolab and the International Astronomical Union,
          Vote on the finalists starting in November and make your mark on the heavens!"
        />
        <Meta
          name="twitter:image"
          content="https://media.wnyc.org/i/raw/2024/09/ZoozveOG.png"
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
        <h1 class="quasi-moon title h2 gold text-center lg:text-7xl">Name a Quasi-Moon</h1>
      </div>
    </section>
    <section class="below-head -mt-8">
      <div class="content py-0">
        <h4 class="gold md:px-8">
          A global naming contest from Radiolab and the International Astronomical Union, vote on the finalists starting in November and make your mark on the heavens! 
        </h4>
      </div>
    </section>
    <section class="count-down px-2 py-6 lg:p-8">
      <h2 class="text-center text-white font-normal">Voting begins in...</h2>
      <CountDown :targetDate="new Date('2024-11-01T00:00:00')" />
    </section>
    <span class="flex justify-content-center align-content-center">
        <img alt="icon" src="/rl-icon-stripes.svg" class="icon ml-2 pb-2 divider-icon">
      </span>
    <!-- <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 font-normal text-white">Meet the Panel</h1>
          </div>
        </div>
      </div>
    </section> -->
    <section>
      <div class="content xl:px-8 cards">
        <!-- <div v-if="dataLoaded" class="grid mb-6">
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
        <team-skeleton v-else :row-count="30" /> -->
        <!-- <section class="mb-8"> -->
          <div class="info-card mb-6 p-5">
            <div>
              <h2 class="mb-4">Get ready to vote</h2>
              <p class="mb-4 card-nudge">
                <ul class="submissions-card">
                  <li class="submissions-card">The <strong>Name a Quasi-Moon</strong> submission phase is now officially closed…and WOW! Thanks to all of you from all over the world who submitted names!</li>
                  <li class="submissions-card">The results are in and we received over <strong>2,700 submissions</strong> from <strong>96 countries</strong>.</li>
                  <li class="submissions-card">We've recruited a star-studded (wink wink) panel to help us winnow down all of those names into 10 finalists for you to vote on. <strong>Big reveal soon</strong>!</li>
                </ul>
              </p>
            </div>
          </div>
          <div class="subscribe-to-the-newsletter mb-6 p-5">
            <div>
              <h2 class="mb-4">We’ll let you know when it is time to vote!</h2>
              <p class="mb-6">
                Signup for updates on the contest and more!  The Radiolab newsletter includes short essays, recommendations, 
                and details about other ways to interact with the show.
              </p>
            </div>
            <newsletter-form location="quasi moon landing page" class="mb-6" />
            <p class="footer">By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our <a target="_blank" href="https://www.wnyc.org/terms/" rel="noopener noreferrer">Terms</a>.</p>
          </div>
        <!-- </section> -->
        <section>
      <div class="content xl:px-0 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 font-normal text-white what-is-quasi">What is a Quasi-Moon?</h1>
            <ZoozveEpisode class="mb-6" />
            <div class="grid justify-content-center">
              <div class="col-12 sm:col-6 lg:col-4 mb-6">
                <client-only>
                  <v-card
                        image="https://www.nasa.gov/wp-content/uploads/2023/10/cu06-illustration-16x9-v01.png"
                        :width="320"
                        :height="240"
                        alt="Navy blue and red illustration of Nasa's Curious Universe podcast logo"
                        title="An Asteroid by Any Other Name..."
                        titleLink="https://www.nasa.gov/podcasts/curious-universe/an-asteroid-by-any-other-name-with-latif-nasser/"
                        eyebrow="NASA's Curious Universe"
                        blurb="Latif join's NASA's Curious Universe to untangle the mystery of a strange space rock that’s not quite a moon but not quite a normal asteroid, either."
                        :max-width="3840"
                        :max-height="2160"
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                      >
                        <!-- <play-selector :episode="episode.attributes" :kids="kids" /> -->
                      </v-card>
                    </client-only>
                  </div>
                  <div class="col-12 sm:col-6 lg:col-4 mb-6">
                <client-only>
                  <v-card
                        image="https://media.wnyc.org/i/raw/2024/09/NameAMoon.png"
                        :width="320"
                        :height="240"
                        alt="Blue illustration card for a Youtube Playlist about Radiolab's Quasi Moon Contest"
                        title="Name a Moon... Make Space History!"
                        titleLink="https://www.youtube.com/playlist?list=PLLHAUHF-RPhlk5-ou58iu-O0vxhOfyBDX"
                        eyebrow="Youtube Playlist"
                        blurb="Watch the Youtube Playlist to learn more about the Quasi Moon Contest and how you can participate."
                        :max-width="320"
                        :max-height="240"
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                      >
                        <!-- <play-selector :episode="episode.attributes" :kids="kids" /> -->
                      </v-card>
                    </client-only>
                  </div>
                  <div class="col-12 sm:col-6 lg:col-4 mb-6">
                <client-only>
                  <v-card
                        image="https://cdn.mos.cms.futurecdn.net/gu9kwKxyosV4QuLip5mtSd-640-100.jpg"
                        :width="320"
                        :height="240"
                        alt="Illustration of the Space Dot Com Logo over a colorful image of outer space."
                        title="Earth has 7 strange quasi-moons — and you could name one of them"
                        titleLink="https://www.space.com/earth-quasi-moon-naming-radiolab-iau"
                        eyebrow="Article"
                        blurb="Usually, things in space are given two names. One is formal, and the other is fun. It makes sense. Researchers need precise nomenclature..."
                        :max-width="640"
                        :max-height="360"
                        responsive
                        :ratio="[3, 2]"
                        :sizes="[2]"
                        flat-quality
                        bp="max"
                        class="radiolab-card"
                      >
                        <!-- <play-selector :episode="episode.attributes" :kids="kids" /> -->
                      </v-card>
                    </client-only>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
        
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.card-nudge {
  @include media(">md") {
    padding-left: 2rem;
  }
}

.has-head-color.quasi-moon {
  background-color: #000000;
  color: #ffffff;
  padding: 2rem 0;
}
.quasi-moon {
  .divider-icon {
    max-width: 5rem;
    @include media("<md") {
        max-width: 3rem;
      }
  }

  .info-card {
    background-color: #000000;
    color: #ffffff;
    h2 {
      color:#FFFFFF;
    }
  }
  
  ul.submissions-card {
    font-family: var(--font-family);
    font-size: var(--font-size-8);
    line-height: var(--font-size-13);
    font-weight: var(--font-weight-400);
    color: #FFFFFF;
    @include media(">md") {
      padding-left:2.5rem;
    }
  }

  li.submissions-card {
    font-family: var(--font-family);
    font-size: var(--font-size-8);
    line-height: var(--font-size-13);
    font-weight: var(--font-weight-400);
    color: #FFFFFF;
  }

  .graphic-head-bg {
    background-color: #000000;
    background-image: url("/stars_result.webp");
    background-position: center bottom;
    background-size: cover;
    background-size: cover;
    .shape-holder {
      width: 100%;
      background-color: #0000004d;
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
      @include media("<md") {
        max-width: 360px;
      }
      @include media("<sm") {
        max-width: 280px;
      }
    }
  }

  h1.quasi-moon.h2 {
    @include media("<md") {
        font-size: var(--font-size-13);
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

  .subscribe-to-the-newsletter {
    h2 {
      max-width: 100%;
      }
    @include media(">lg") {
      .newsletter-form {
      max-width: 80%;
      }
    p {
      max-width: 80%;
      }
    }
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

  .what-is-quasi {
    padding-bottom: 2.5rem;
  }
}
</style>