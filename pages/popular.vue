<script setup>
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const popularEpisodesApiUrl = `${config.API_URL}/api/v3/buckets/radiolab-popular-episodes/`
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Popular Episodes | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Popular Episodes | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:title"
          content="Popular Episodes | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <div class="episode-archive">
              <h1 class="h2">Popular Episodes</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="100"
      :rowsPerAd="2"
      :api="popularEpisodesApiUrl"
      path="data.data.attributes.bucket-items"
      bucket
    />
    <div class="htlad-radiolab_in-content_2 mb-8" />
  </div>
</template>

<style lang="scss"></style>
