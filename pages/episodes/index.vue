<script setup>
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`
// const apiUrl = `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/`
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>Episode Archive | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Episode Archive | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:title"
          content="Episode Archive | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <div class="episode-archive">
              <h1 class="h2">Episode Archive</h1>
            </div>
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
    <div class="htlad-radiolab_in-content_2 mb-8" />
  </div>
</template>

<style lang="scss"></style>
