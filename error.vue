<script setup>
import colors from '~/assets/scss/colors.module.scss'
import { useRuntimeConfig } from '#app'
const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})
useHead({
  meta: [
    {
      name: 'theme-color',
      content: colors.rlLightorange,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/buckets/radiolab-404/`
</script>
<template>
  <div class="error-page">
    <Html>
      <Head>
        <Title>Error | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          :content="`${error} Error | Radiolab | WNYC Studios`"
        />
        <Meta
          name="twitter:title"
          :content="`${error} Error | Radiolab | WNYC Studios`"
        />
      </Head>
    </Html>
    <radiolab-header :class="[{ 'at-top': atTop }]" />
    <main>
      <section
        class="graphic-head lightorange flex justify-content-center align-content-center"
      >
        <h2 class="text-center font-semibold">Nope.</h2>
      </section>
      <section class="white100bg">
        <div class="error-page-content thin-content-width">
          <div class="grid">
            <div class="col-12">
              <p class="mb-4">
                Not all those who wander are lost. But you sure are!
              </p>
              <p>
                <strong>404 Error.</strong> This page does not exist, but you
                are invited to listen to our
                <strong>All-Time Top Ten Favorite Radiolab Episodes</strong>
                below.
              </p>
            </div>
          </div>
        </div>
      </section>
      <episodes
        class="mt-6 mb-4"
        :row-count="4"
        :api="apiUrl"
        path="data.data.attributes.bucket-items"
        bucket
      />
    </main>
    <radiolab-footer />
    <audio-player />
  </div>
</template>

<style lang="scss">
.error-page {
  .error-page-content {
    padding: 7rem;
    @include media('<md') {
      padding: 1rem;
    }
    text-align: center;
    p {
      font-size: var(--font-size-8);
    }
  }
}
</style>
