<script setup>
import VCard from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue"
import { formatPublisherImageUrl } from "~/utilities/helpers"
import teamData from "./team-data"
import VImageWithCaption from "@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue"

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

const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

onMounted( () => {
  people.value = teamData.included
  totalCount.value = teamData.data.attributes["total-count"]
  dataLoaded.value = true
})

// Goes to the person page URL
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
          name="og:description"
          content="Welcome to Name a Quasi Moon - a global naming contest from Radiolab and the International Astronomical Union."
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
          content="Welcome to Name a Quasi Moon - a global naming contest from Radiolab and the International Astronomical Union."
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
          A global naming contest from Radiolab and the International Astronomical Union. 
        </h4>
      </div>
    </section>
    <!-- <section class="count-down px-2 py-6 lg:p-8">
      <h2 class="text-center text-white font-normal">Voting begins in...</h2>
      <CountDown :targetDate="new Date('2024-11-18T00:00:00')" />
    </section> -->
    <span class="flex justify-content-center align-content-center mt-7">
      <v-image-with-caption
        :image="
          formatPublisherImageUrl(
            'https://media.wnyc.org/i/%s/%s/%s/%s/2025/01/QuasiTrophy2.png'
          )
        "
        alt="trophy image"
        :width="224"
        :height="224"
        :ratio="[1, 1]"
        :sizes="[2]"
        class="trophy-icon"
      />
    </span>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <section>
              <div class="info-card mb-6 center-card">
                <div>
                  <h2 class="mb-6">Voting has now ended. And the winner is...</h2>
                  <h2 class="quasi-moon moonname title h1 text-center lg:text-7xl">CARDEA</h2>
                  <div>
                    <p class="white text-center announcement text-2xl mb-2">Here is the <a href="https://www.wgsbn-iau.org/files/Bulletins/V005/WGSBNBull_V005_001.pdf#page=19" target="_blank" rel='noopener noreferrer' class="quasi-link">official announcement</a> from the International Astronomical Union.</p>
                  </div>
                  <section>
                    <div class="subscribe-to-the-newsletter w-full mb-6 p-5">
                      <div class="about-card">
                        <h2 class="card-left-header card-black mb-4">About the Contest</h2>
                        <p class="card-left max-w-full mb-6">
                          In May 2024, Radiolab and the International Astronomical Union joined forces to launch a contest that invited listeners to help name one of Earth’s quasi-moons. Close to 3,000 people from more than 90 countries submitted entries. Radiolab then convened a panel of experts and interested parties, including teachers, students, astronomers, astrophysicists, journalists and artists. Actor Penn Badgley, Bill Nye “The Science Guy,” astrophysicist and podcast host Dr. Moiya McTier and astronomer and educator Salman Hameed, to name a few. They narrowed the names down to seven finalists. During the month of December 2024, more than 10,000 people cast a vote to choose Cardea to be the name for the quasi-moon previously known as (164207) 2004 GU9.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
                <span class="flex justify-content-center align-content-center mt-7">
                  <img alt="icon" src="/rl-icon-stripes.svg" class="icon ml-2 pb-2 divider-icon">
                </span>
              </div>
            </section>
            <div class="kelly">
            <h2 class="white mb-6">About The Finalists</h2>
            <div class="grid">
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Bakunawa</h4>
                <p class="small-white-text mb-3 pronunciation">[ bah-koo-nah-wah ]</p>
                <p class="small-white-text mb-3">Submitted by Arjay L (the Philippines), Enzo M (the Philippines)</p>
                <p class="small-white-text">Bakunawa, a mythical dragon from Philippine folklore, is said to rise from the ocean to swallow the moon, explaining lunar eclipses in ancient times. This fearsome serpent, associated with powerful natural events, embodies the mysterious and formidable nature of the quasi-moon, which appears and disappears from sight. Naming the quasi-moon Bakunawa would honor pre-colonial Philippine mythology and inspire pride and connection among Filipinos, bringing an ancient cultural story to the forefront of global astronomy.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Cardea</h4>
                <p class="small-white-text mb-3 pronunciation">[ kar-dee-ah ]</p>
                <p class="small-white-text mb-3">Submitted by Clay C (USA)</p>
                <p class="small-white-text">A name imbued with elegance and depth, Cardea is the Roman goddess of doorways and transitions, symbolizing the guardianship of thresholds. This quasi-moon, forever straddling the space between Earth and the cosmos, reflects Cardea's dominion over liminal states, embodying a celestial gatekeeper of the in-between.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Ehaema</h4>
                <p class="small-white-text mb-3 pronunciation">[ eh-hey-ma ]</p>
                <p class="small-white-text mb-3">Submitted by Liisi A (Estonia)</p>
                <p class="small-white-text">Rooted in Estonian folklore, Ehaema, the "Mother Twilight," embodies the serene, mysterious moments of dusk. She symbolizes the delicate balance between light and darkness, guiding people to complete their work before nightfall. This quasi-moon, suspended between Earth and the vastness of space, mirrors Ehaema's gentle reminder of transitions and the quiet beauty of twilight.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Enkidu</h4>
                <p class="small-white-text mb-3 pronunciation">[ en-kee-doo ]</p>
                <p class="small-white-text mb-3">Submitted by Aaron C (USA), Moira P (USA), Aaron F (USA), Brent J (USA)</p>
                <p class="small-white-text">Named after the wild and noble companion from the ancient Sumerian Epic of Gilgamesh, Enkidu represents both wild freedom and loyal friendship. Like Enkidu's presence on the fringes of civilization, this quasi-moon orbits close yet distinct from Earth, embodying the bond between two entities sharing space, destined to part ways in time.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Ótr</h4>
                <p class="small-white-text mb-3 pronunciation">[ oh-tr ]</p>
                <p class="small-white-text mb-3">Submitted by Grzegorz B (Poland)</p>
                <p class="small-white-text">A shape-shifting dwarf from Norse mythology, Ótr spent his days in the form of an otter, navigating the boundaries between human and wild realms. This quasi-moon, with its quiet presence and potential for both playfulness and mystery, mirrors the qualities of Ótr—observant, elusive, and always near yet unseen. The choice highlights the moon's interaction with Earth, subtly woven into our cosmic neighborhood.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Tarriaksuk</h4>
                <p class="small-white-text mb-3 pronunciation">[ tah-ree-ahk-sook ]</p>
                <p class="small-white-text mb-3">Submitted by Samuel L (USA)</p>
                <p class="small-white-text">The Tarriaksuk of Inuit legend are shadow beings that mirror human forms yet dwell in another dimension. Like these beings, this quasi-moon mimics the true moon but follows a unique, transient path, appearing briefly before vanishing into the dark. The name underscores themes of duality and fleeting visibility, aligning with the moon's parallel, shadow-like existence.</p>
              </div>
              <div class="col col-12 md:col-6 lg:col-3 mb-3 p-4">
                <h4 class="gold text-2xl mb-2">Tecciztecatl</h4>
                <p class="small-white-text mb-3 pronunciation">[ teh-siz-teh-kahtl ]</p>
                <p class="small-white-text mb-3">Submitted by Muhammad Hussain 	R (Pakistan), Claudia	C (USA), Gabriel G (Mexico)</p>
                <p class="small-white-text">An Aztec lunar god who once aspired to be the sun, Tecciztecatl's hesitant leap into the fire ultimately destined him for the moon. His story is echoed in the quasi-moon's orbit—neither sun nor true moon but a celestial presence cast in the role of an eternal companion. The name pays tribute to indigenous stories that often go unrecognized in modern space nomenclature.</p>
              </div>
            </div>
            <nuxt-link class="flex justify-content-center no-underline quasi-names" to="https://media.wnyc.org/media/resources/2024/Dec/05/Quasi-moon_names_12_5_24.pdf" target="_blank" rel='noopener noreferrer'>
              <Button class="p-button-lg p-button-rounded" label="Read More"/>
            </nuxt-link>
          </div>
            <h1 class="h2 font-normal text-white">Meet the Panel</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content xl:px-8 cards">
        <div v-if="dataLoaded" class="grid mb-6">
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
          <section>
            <nuxt-link class="flex justify-content-center no-underline quasi-names" to="https://media.wnyc.org/media/resources/2024/Dec/04/Quasi-MoonPanel.pdf" target="_blank" rel='noopener noreferrer'>
                <Button class="p-button-lg p-button-rounded" label="Read More"/>
            </nuxt-link>
          </section>
        </div>
        <team-skeleton v-else :row-count="30" />
        <!-- <section class="mb-8"> -->
          <div class="subscribe-to-the-newsletter mb-6 p-5">
            <div>
              <h2 class="mb-4">Subscribe to the newsletter</h2>
              <p class="mb-6">
                Dive deeper into Radiolab's world. You will receive little essays, book reviews, staff recommendations, and more. Sign up here:
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
                  <div class="info-card mb-6 p-5">
            <div>
              <h2 class="mb-4">Naming Contest & Voting FAQ</h2>
              <div class="mb-4 card-nudge">
                <h3 class="question">How did we get our quasi-moon name finalists?</h3>
                <p class="white answer">Inspired by Radiolab’s <a href="https://radiolab.org/podcast/zoozve" class="quasi-link" target="_blank" rel='noopener noreferrer'>Zoozve</a> episode, Radiolab and the International Astronomical Union (IAU) put out a call soliciting names for Earth's quasi-moon. We received over 2,700 name submissions from 96 countries! Our <a href="https://media.wnyc.org/media/resources/2024/Dec/04/Quasi-MoonPanel.pdf" class="quasi-link" target="_blank" rel='noopener noreferrer'>panel of judges</a> narrowed it down to a list of finalists with a voting rubric, panel discussion, and vetting by the IAU and cultural leaders.</p>
                <h3 class="question">What was the rating rubric used to choose the top 10?</h3>
                <ul class="submissions-card">
                  <li class="submissions-card faq-li"><strong>50% Creativity & Uniqueness:</strong> Does the name stand out as original or clever?</li>
                  <li class="submissions-card faq-li"><strong>40% Relevance to the Quasi-Moon's Properties:</strong> How well does the name relate to the astronomical or scientific aspects of the quasi-moon?</li>
                  <li class="submissions-card faq-li"><strong>10% Effort & Thought:</strong> Does the submission reflect thoughtfulness and effort in its explanation?</li>
                </ul>
                <h3 class="question">What are the official naming rules for the Name a Quasi-Moon Contest?</h3>
                <p class="white answer">Read the <a href="https://radiolab.org/moon-official-rules/" target="_blank" rel='noopener noreferrer' class="quasi-link">official contest rules</a> for full naming guidelines. </p>
                <h3 class="question">What’s a quasi-moon?</h3>
                <p class="white answer">A quasi-moon is a space rock that orbits the sun nearby a planet. Weirdly, if you watch it from the planet, it looks like it’s going around you the way a moon would. But it’s too small and too far away to be a moon. And it’s barely being pulled around by the planet’s gravity. So it’s just hanging out, doing this funny awkward cosmic dance with the planet. Not a moon, but also not NOT a moon.</p>
                <h3 class="question">What does quasi-moon (164207) 2004 GU9 look like?</h3>
                <p class="white answer"><a href="https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=164207&view=OPDCA" class="quasi-link" target="_blank" rel='noopener noreferrer'>(164207) 2004 GU9</a> is a quasi-moon that will be with us (the Earth) until about the year 2600. It’s a gray rocky asteroid, about 500 feet across, likely potato shaped, with little jagged edges all over it.</p>
                <h3 class="question">Where can I read all the submissions?</h3>
                <p class="white answer">To get full details, <a href="https://media.wnyc.org/media/resources/2024/Dec/05/Quasi-moon_names_12_5_24.pdf" class="quasi-link" target="_blank" rel='noopener noreferrer'>read this document</a> about the final name submissions.</p>
              </div>
            </div>
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

.moonname {
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 0.17rem;
}

.announcement {
  padding-top: 2rem;
  padding-bottom: 3rem;
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

  .trophy-icon {
    max-width: 14rem;
    @include media("<md") {
        max-width: 14rem;
      }
  }

  .info-card {
    background-color: #000000;
    color: #ffffff;
    h2 {
      color:#FFFFFF;
    }
    h3 {
      color:#FFFFFF;
    }
  }

  .about-card {
    padding-top: 1rem;
    padding-left: 8vw;
    padding-right: 8vw;
    @include media("<md") {
        padding-left: 1rem;
        padding-right: 1rem;
      }
  }

  .card-left-header {
    text-align: left;
    padding-top: 1rem;
    letter-spacing: 0.04rem;
    line-height: 2.3rem;
  }

  .card-left {
    text-align: left;
    padding-top: 1rem;
    letter-spacing: 0.04rem;
    line-height: 1.5rem;
  }

  .card-black {
    color: #000000 !important;
  }

  .center-card {
    text-align: center;
  }

  .pronunciation {
    opacity: 0.5;
  }

  .quasi-link {
    color: #FFFFFF;
    text-decoration: underline;
    font-weight: 600;
  }

  .quasi-link:hover {
    color: #fff322 !important;
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
    padding-bottom: 14px;
  }

  li.submissions-card.faq-li {
    font-size: 16px;
    line-height: 24px;
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

  .white {
    color: #ffffff;
  }

  .small-white-text {
    color: #ffffff;
    line-height: 20px;
    font-size: 14px;
  }

  .quasi-names {
    padding: 2rem 0 3rem;
  }

  .question {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .answer {
    padding-bottom: 1.5rem;
  }
}
</style>