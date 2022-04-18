<script setup>
import colors from '~/assets/scss/colors.module.scss'
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
</script>

<template>
  <div class="error-page">
    <Html>
      <Head>
        <Title>404 Error | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="404 Error | Radiolab | WNYC Studios" />
        <Meta name="twitter:title" content="404 Error | Radiolab | WNYC Studios" />
      </Head>
    </Html>
    <section class="graphic-head lightorange flex justify-content-center align-content-center">
      <h2 class="text-center font-semibold">Nope.</h2>
    </section>
    <section class="white100bg">
      <div class="content md:p-8 thin-content-width">
        <div class="grid">
          <div class="col-12 md:p-6">
            <p class="mb-4">Not all those who wander are lost. But you sure are!</p>
            <p>
              <strong>404 Error - Not Found</strong> - this page does not exist,
              but you are invited to listen to our
              <strong>All-Time Top Ten Favorite Radiolab Episodes</strong>
              below.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- TODO: need top ten endpoint -->
    <episodes
      class="mt-6 mb-4"
      :row-count="3"
      api="https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/"
      path="data.included"
    />
  </div>
</template>

<style lang="scss">
.error-page {
  .graphic-head {
    // defaults used for 404 page
  }

  .content {
    text-align: center;
  }
}
</style>