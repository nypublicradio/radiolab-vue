<script setup>
import { useRuntimeConfig } from '#app'

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

config = useRuntimeConfig()
const apiUrl = `${apiUrl}/api/v3/channel/shows/radiolab/recent_stories/`
</script>

<template>
  <div class="error-page">
    <Html>
      <Head>
        <Title>500 Error | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="500 Error | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="500 Error | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section
      class="graphic-head lightorange flex justify-content-center align-content-center"
    >
      <h2 class="text-center font-semibold">Nope.</h2>
    </section>
    <section class="white100bg">
      <div class="content md:p-8 thin-content-width">
        <div class="grid">
          <div class="col-12 md:p-6">
            <p class="mb-4">
              Not all those who wander are lost. But you sure are!
            </p>
            <p>
              <strong>500 Error</strong> - something has gone wrong on the web
              site's server, but you are invited to listen to our
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
}
</style>
