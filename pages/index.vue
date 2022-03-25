<script setup>
import { ref } from 'vue'
const darkMode = ref(false)
</script>

<template>
  <div class="home-page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <latest-episode class="mb-4" />
    <episodes
      class="mb-4"
      header="Recent Episodes"
      button-text="All Episodes"
      button-link="/episodes"
      :row-count="1"
      :startCount="1"
      api="https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/"
      path="data.included"
    />
    <exclusive-content-from-the-lab class="mb-8" />
    <radiolab-series class="mb-8" />

    <!-- <popular-episodes class="mb-8" /> -->
  </div>
</template>

<style lang="scss"></style>