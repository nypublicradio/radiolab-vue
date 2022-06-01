<script setup>
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/radio-shows/`
// const apiUrl = `https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/radio-shows/`
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Radio Shows | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="Radio Shows | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="Radio Shows | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h1 class="h2">Radio Shows</h1>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      :api="apiUrl"
      path="data.included"
      :paginate="true"
    />
  </div>
</template>

<style lang="scss"></style>
