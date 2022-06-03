<script setup>
import gaEvent from '../utilities/ga.js'
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
    class: 'has-head-color invert-menu-color',
  },
})
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>The Lab | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="The Lab | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="The Lab | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section
      class="graphic-head flex justify-content-center align-content-center"
      data-style-mode="blue"
    >
      <img
        class="the-lab-sticker mt-2 lg:mt-6 mb-4"
        src="/the-lab-sticker.svg"
        alt="The Lab logo"
      />
      <h1 class="h4 text text-center">
        Join us in our investigation into this strange world.
      </h1>
      <div class="flex mt-5" style="gap: 1rem">
        <v-flexible-link to="https://members.radiolab.org" raw>
          <Button
            class="p-button-rounded"
            label="Become a member"
            @click="
              gaEvent('Click Tracking', 'The Lab Hero CTA', 'Become a member')
            "
          />
        </v-flexible-link>
        <v-flexible-link to="https://members.radiolab.org/request_access" raw>
          <Button
            class="blue p-button-rounded p-button-outlined"
            label="Sign in"
          />
        </v-flexible-link>
      </div>
    </section>
    <section class="white100bg">
      <div class="content md:px-5 lg:px-8">
        <div class="grid">
          <div class="col-12 lg:col-5 md:col-6">
            <div class="caps-header">
              A New membership experience developed by Radiolab
            </div>
          </div>
          <div class="col-12 md:col-5 lg:col-offset-2 md:col-offset-1">
            <p class="mb-3">
              Get access to our archive, exclusive swag, and opportunities to
              connect with the Radiolab team and community.
            </p>
            <p>
              Plus, you'll be directly powering the incredible, deeply reported
              episodes you hear each week.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content membership-holder my-6 px-0 md:px-3">
        <the-lab-membership />
      </div>
    </section>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col col-12 lg:col-6">
            <testimonial
              name="Ruth"
              city="Zurich"
              country="Switzerland"
              flag-code="ch"
              quote="Radiolab brings so much joy to my life, challenges me, takes me to places I would never go to otherwise. Please never ever stop."
            />
          </div>
          <div class="col col-12 lg:col-6">
            <div class="how-you-power-radiolab">
              <div class="caps-header text-center sm:text-left">
                How you power
                <span class="block sm:hidden">Radiolab</span>
              </div>
              <img
                class="w-full py-4 xl:p-6 hidden sm:block"
                src="/the-lab/journey-illustration.jpg"
                alt="path to power Radiolab"
              />
              <img
                class="w-full py-4 xl:p-6 block sm:hidden"
                src="/the-lab/journey-illustration-mobile.jpg"
                alt="path to power Radiolab"
              />
              <div class="caps-header text-right hidden sm:block">Radiolab</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content faqs-holder">
        <div class="grid">
          <div class="col-12">
            <div class="flex justify-content-between align-items-center mb-4">
              <p>Frequently Asked Questions</p>
              <v-flexible-link raw to="https://members.radiolab.org/help">
                <Button class="p-button-rounded p-button-sm">All FAQs</Button>
              </v-flexible-link>
            </div>

            <div class="question">
              <p>How do I access my ad-free version of Radiolab?</p>
              <p>
                You can find
                <v-flexible-link to="https://members.radiolab.org/help"
                  >detailed instructions</v-flexible-link
                >&nbsp;on adding our ad-free version of Radiolab to your podcast
                player
                <v-flexible-link to="https://members.radiolab.org/help"
                  >here</v-flexible-link
                >.
              </p>
            </div>

            <div class="question">
              <p>How do I manage my Radiolab Membership?</p>
              <p>
                Log in to your
                <v-flexible-link
                  to="https://members.radiolab.org/request_access"
                  >membership portal</v-flexible-link
                >. From there, you can update your payment details or change
                your giving tier. You're also free to cancel your membership at
                any time - though we hope you don't!
              </p>
            </div>

            <div class="question">
              <p>Is my Radiolab membership tax-deductible?</p>
              <p>
                Radiolab is a part of New York Public Radio, a 501c(3)
                non-profit organization. A portion of your payment may be
                deductible. Please refer to your emailed acknowledgment for more
                information on your payment, and consult your tax advisor for
                information specific to your situation.
              </p>
            </div>
            <div class="question">
              <p>How do I support Radiolab without joining The Lab?</p>
              <p>
                Thank you so much for your interest in Radiolab. Your support
                helps Radiolab continue to provoke, delight, and keep audiences
                curious.
              </p>
              <p class="mt-4">
                To learn more about
                <v-flexible-link to="https://nypublicradio.org/support/"
                  >higher level giving opportunities</v-flexible-link
                >, please contact the Development Office at
                <v-flexible-link to="mailto:giving@nypublicradio.org"
                  >giving@nypublicradio.org</v-flexible-link
                >&nbsp;or
                <v-flexible-link to="tel:19293354108" target="_self"
                  >(929) 335-4108</v-flexible-link
                >
              </p>
            </div>

            <p class="mt-4">
              You may also make an online contribution to
              <v-flexible-link
                to="https://pledge.wnyc.org/support/studios"
                target="_blank"
              >
                WNYC Studios
              </v-flexible-link>
              directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.the-lab {
  .graphic-head {
    background-color: var(--blue-500);
    background-image: none;
    padding: $headerHeight 0;
    height: auto;

    .the-lab-sticker {
      width: 210px;
      height: auto;
    }

    .text {
      position: relative;
      color: var(--white100);
      font-size: var(--font-size-17);
      line-height: normal;
      letter-spacing: 10px;
      width: 910px;
      padding: 0 2rem;

      @include media('<lg') {
        font-size: var(--font-size-13);
        width: 650px;
      }

      @include media('<md') {
        font-size: var(--font-size-11);
        letter-spacing: 6px;
        padding: 0 0.5rem;
        width: auto;
      }
    }

    .p-button {
      @include media('<sm') {
        font-size: var(--font-size-6);
      }
    }
  }

  .membership-holder {
    &.content {
      max-width: 1030px;
    }
  }

  .how-you-power-radiolab {
    background-color: var(--white100);
    border-radius: 20px;
    overflow: hidden;
    padding: 2rem;

    @include media('<=sm') {
      padding: 2rem 1rem;
    }

    .caps-header {
      font-size: var(--font-size-15);
      letter-spacing: 0.5rem;
      line-height: var(--font-size-15);

      @include media('>lg', '<xl') {
        font-size: var(--font-size-12);
        line-height: var(--font-size-12);
      }

      @include media('<md') {
        font-size: var(--font-size-14);
        line-height: var(--font-size-14);
      }

      @include media('<sm') {
        font-size: var(--font-size-8);
        line-height: var(--font-size-8);
        letter-spacing: 0.35rem;
      }
    }
  }

  .faqs-holder {
    max-width: 768px;

    .question {
      margin-bottom: spacing(6);

      p {
        line-height: normal;

        &:first-child {
          font-weight: var(--font-weight-500);
        }
      }
    }
  }
}
</style>
