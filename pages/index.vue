<script setup>
import { ref } from 'vue'
const darkMode = ref(false)
</script>

<template>
  <div class="home-page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <recent-episodes class="mb-100" />
    <exclusive-content-from-the-lab class="mb-100" />
    <radiolab-series class="mb-100" />
    <popular-episodes class="mb-100" />
  </div>
</template>