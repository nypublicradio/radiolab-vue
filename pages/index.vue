<script setup>
import { ref } from 'vue'
const darkMode = ref(false)
</script>

<template>
  <div class="home-page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <recent-episodes class="mb-8" />
    <exclusive-content-from-the-lab class="mb-8" />
    <radiolab-series class="mb-8" />
    <popular-episodes class="mb-8" />
  </div>
</template>