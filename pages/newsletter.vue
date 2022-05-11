<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const recentEpisodesApiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`
const popularEpisodesApiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/recent_stories/`
// const recentEpisodesApiUrl = `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/`
// const popularEpisodesApiUrl = `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/`
</script>

<template>
  <div>

    <section class="mb-8">
      <div class="content thin-content-width">
        <div class="grid">
          <div class="col-12">
            <subscribe-to-the-newsletter class="alone"/>
          </div>
        </div>
      </div>
    </section>
    <div class="htlad-radiolab_in-content_1 mb-8" />
  </div>
</template>
