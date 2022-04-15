<script setup>
import colors from '~/assets/scss/colors.module.scss'
import { useRuntimeConfig } from '#app';

useHead({
  meta: [
    {
      name: 'theme-color',
      content: colors.rlLightblue,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})

const config = useRuntimeConfig();
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`;
</script>

<template>
  <div class="error-page">
    <section
      class="graphic-head flex justify-content-center align-content-center"
    >
      <h2 class="text-center font-semibold">Nope.</h2>
    </section>
    <section class="white100bg">
      <div class="content p-3 md:p-8">
        <div class="grid justify-content-between">
          <div class="col-12 lg:col-5">
            <p class="mb-4">
              Not all those who wander are lost. But you sure are!
            </p>
            <p>
              <strong>404 Error - Not Found</strong> - this page does not exist,
              but you are invited to listen to our
              <strong>All-Time Top Ten Favorite Radiolab Episodes</strong>
              below.
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-content-end">
        <img class="error-image" alt="error image" src="/error-404.png" />
      </div>
    </section>
    <!-- TODO: need top ten endpoint -->
    <episodes
      class="mt-6 mb-4"
      :row-count="3"
      :api="apiUrl"
      path="data.included"
    />
  </div>
</template>

<style lang="scss">
.error-page {
  .graphic-head {
    // defaults used for 404 page
  }
  .error-image {
    position: relative;
    width: 100%;
    max-width: 316px;
    height: auto;
    margin-top: 0;
    @include media('>lg') {
      margin-top: -490px;
      max-width: 616px;
    }
  }
}
</style>