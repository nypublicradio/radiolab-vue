<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { playServices } from '~/utilities/constants'
useHead({
  meta: [
    {
      name: 'theme-color',
      content: '#000000',
    },
  ],
  bodyAttrs: {
    class: 'has-head-color invert-menu-color',
  }
})
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>How To Listen | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="How To Listen | Radiolab | WNYC Studios" />
        <Meta name="twitter:title" content="How To Listen | Radiolab | WNYC Studios" />
      </Head>
    </Html>
    <section class="graphic-head flex justify-content-center align-content-center">
      <h1 class="h2 text text-center font-semibold">How To Listen</h1>
    </section>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col-12 text-center">
            <div class="mt-6">
              <h3>Play on our site</h3>
              <p class="mt-2 mb-3 text-padding">
                Listen to Radiolab episodes for free on our site and become a member to
                access the entire archive directly in your podcast feed
              </p>
              <v-flexible-link raw to="the-lab">
                <Button class="p-button-rounded">Become a member</Button>
              </v-flexible-link>
              <!-- <img
                alt="place holder player image"
                class="w-full mt-3 max-w-min m-auto block"
                src="/temp-player.png"
              />-->
            </div>
            <Divider align="center" class="my-6">
              <h3>or</h3>
            </Divider>
            <h3 class="mb-5">Streaming platforms</h3>

            <div class="grid">
              <div
                v-for="(service, index) in playServices"
                :key="`${service.name}-${index}`"
                class="col-12 sm:col-6 xl:col-4"
              >
                <v-flexible-link raw :to="service.url">
                  <div class="service">
                    <img
                      alt="service logo"
                      class="icon"
                      :src="`/play-service-icons/${service.icon}.svg`"
                    />
                    <p>
                      {{ service.name }}
                      <span class="pi pi-arrow-up-right"></span>
                    </p>
                  </div>
                </v-flexible-link>
              </div>
            </div>
            <Divider align="center" class="my-6">
              <h3>or</h3>
            </Divider>
            <h3>On the radio</h3>
            <p class="mt-2 text-padding">
              New episodes of Radiolab air every Saturday and 12pm EST on WNYC. Episodes
              repeat Monday's at 8pm EST. Check with your local station for more air times.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.how-to-listen {
  .text-padding {
    padding: 0 25% 0 25%;

    @include media("<lg") {
      padding: 0 15% 0 15%;
    }

    @include media("<md") {
      padding: 0;
    }
  }

  .graphic-head {
    background-color: var(--black100);
    background-image: url("/rl-icon-on-black-white-invert.svg");
    background-position: 50% 50%;
    background-size: 1000px;

    .text {
      color: var(--white100);
    }
  }

  .flexible-link {
    .service {
      display: flex;
      align-items: center;
      background-color: var(--white);
      border: 1px solid var(--white100);
      box-shadow: var(--shadow);
      border-radius: 10px;
      padding: 30px;
      transition: border-color var(--transition-duration);
      -webkit-transition: border-color var(--transition-duration);
      cursor: pointer;

      .icon {
        width: 40px;
        height: 40px;
        margin-right: 0.5rem;
      }

      .pi {
        display: none;
      }

      p {
        font-size: var(--font-size-8);
      }
    }

    &:hover {
      .service {
        border: 1px solid var(--black100);

        .pi {
          display: inline-block;
        }
      }
    }
  }
}
</style>