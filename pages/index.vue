<script setup>
import { ref } from 'vue'
const darkMode = ref(false)
</script>

<template>
  <div class="home-page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <recent-episodes class="mb-8" />
    <exclusive-content-from-the-lab class="mb-8" />
    <section class="mb-8">
      <div class="content">
        <div class="grid">
          <div class="col-12 md:col-6">
            <subscribe-to-the-newsletter />
          </div>
          <div class="col-12 md:col-6">
            <listeners-cta />
          </div>
        </div>
      </div>
    </section>
    <radiolab-series class="mb-8" />
    <popular-episodes class="mb-8" />
  </div>
</template>