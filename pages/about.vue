<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import colors from '~/assets/scss/colors.module.scss'
useHead({
  meta: [
    {
      name: 'theme-color',
      content: colors.rlRedorange,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})

</script>

<template>
  <div>
    <section class="graphic-head flex justify-content-center align-content-center">
      <h2 class="text text-center font-semibold">About Radiolab</h2>
    </section>
    <section>
      <div class="content thin-content-width">
        <div class="grid">
          <div class="col-12 text-center">
            <div class="mt-6">
              <p class="mb-3">
                Radiolab is on a curiosity bender. We ask deep questions and use
                investigative journalism to get the answers. A given episode
                might whirl you through science, legal history, and into the
                home of someone halfway across the world. The show is known for
                innovative sound design, smashing information into music. It is
                hosted by Jad Abumrad, Lulu Miller, and Latif Nasser.
              </p>
              <p class="mb-3">
                Radiolab is available on Apple, Spotify, Stitcher, or wherever
                you get your podcasts. Check your local station for airtimes.
                It's also available via the CBC, ABC, and the BBC.
              </p>
              <p class="mb-3">
                Contact Radiolab using
                <v-flexible-link
                  to="https://wnycstudios.zendesk.com/hc/en-us/requests/new?ticket_form_id=923428"
                >this form.</v-flexible-link>
              </p>
            </div>
            <Divider align="center" class="my-6" />
            <p class="mb-3">Embed the Radiolab widget on your blog or website:</p>
            <textarea class="mb-3" rows="8">
<iframe frameborder='0' height='180' src="https://www.wnyc.org/widgets/bucket_player/#slotname=radiolab-bucket-player-episodes" mce_src="https://www.wnyc.org/widgets/bucket_player/#slotname=radiolab-bucket-player-episodes" width='300px'></iframe></textarea>
            <Divider align="center" class="my-6" />
            <p class="mb-3">
              All press inquiries may be directed to
              <v-flexible-link to="mailto:jhoulihan@nypublicradio.org">Jennifer Houlihan Roussel</v-flexible-link>at
              <v-flexible-link to="tel:1646829497" target="_self">(646) 829-4497</v-flexible-link>.
            </p>
            <p class="mb-3">
              Please read about changes to our comments policy
              <v-flexible-link to="/comments">here</v-flexible-link>.
            </p>
            <Divider align="center" class="my-6" />
            <p class="mb-3">
              <em>
                Radiolab is supported in part by Science Sandbox a Simons
                Foundation initiative dedicated to engaging everyone with the
                process of science. Additional leadership support is provided by
                the Gordon and Betty Moore Foundation, fostering path-breaking
                scientific discover; the Shanahan Family Charitable Foundation;
                The Smart Family Fund; and the John Templeton Foundation.
              </em>
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