<script setup>
import { onMounted } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import colors from '~/assets/scss/colors.module.scss'
useMeta({
  meta: [
    {
      name: 'theme-color',
      content: colors.blue,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color invert-menu-color',
  }
})

</script>
<template>
  <div>
    <section
      class="graphic-head flex justify-content-center align-content-center"
      data-style-mode="blue"
    >
      <img class="the-lab-sticker mt-2 lg:mt-6 mb-4" src="/the-lab-sticker.svg" alt="The Lab logo" />
      <h4 class="text text-center">Join us in our investigation into this strange world.</h4>
      <div class="flex mt-5" style="gap:1rem;">
        <v-flexible-link to="/become-a-member" raw class>
          <Button class="p-button-lg p-button-rounded" label="Become a member" />
        </v-flexible-link>
        <v-flexible-link to="/news" raw class>
          <Button class="blue p-button-lg p-button-rounded p-button-outlined" label="Sign in" />
        </v-flexible-link>
      </div>
    </section>
    <section class="white100bg">
      <div class="content md:px-8">
        <div class="grid">
          <div class="col-12 md:col-5">
            <div class="caps-header">A New membership experience developed by Radiolab</div>
          </div>
          <div class="col-12 md:col-5 md:col-offset-2">
            <p
              class="mb-3"
            >Get access to our archive, exclusive swag, and opportunities to connect with the Radiolab team and community.</p>
            <p>Plus, you'll be directly powering the incredible, deeply reported episodes you hear each week.</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content memberships desktop">
        <div class="grid">
          <div class="col-3">
            <the-lab-tier icon="/the-lab/viper.svg" name="Vipers" cost="5" />
          </div>
          <div class="col-3">
            <h2>The Lab</h2>
          </div>
          <div class="col-3">
            <h2>The Lab</h2>
          </div>
          <div class="col-3">
            <h2>The Lab</h2>
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
      @include media("<lg") {
        font-size: var(--font-size-13);
        width: 650px;
      }
      @include media("<md") {
        font-size: var(--font-size-11);
        letter-spacing: 6px;
        padding: 0 0.5rem;
        width: auto;
      }
    }
    .p-button {
      @include media("<sm") {
        font-size: var(--font-size-6);
      }
    }
  }
  .memberships {
  }
}
</style>
