<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const episodes = ref([])
onMounted(async () => {
  await axios
    .get(
      'https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/radio-shows/1?limit=3'
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <div class="radiolab-series container">
    <div class="flex justify-content-between">
      <h3 class="mb-4">Series</h3>
      <nuxt-link class="all-series" to="/episodes">All Series</nuxt-link>
    </div>
    <div v-if="dataLoaded" class="grid">
      <div v-for="(episode, index) in episodes.slice(0,3)" :key="index" class="col-12 xl:col-4">
        <mini-card
            :image="episode.attributes['image-main'].url"
            :alt="episode.attributes['image-main']['alt-text']"
            :url="episode.attributes.url"
            members-only            
            subtitle="subtitle goes here"
            :tease="episode.attributes.tease"
            :title="episode.attributes.title"
        />
      </div>
    </div>
    <skeleton v-else />
  </div>
</template>

<style lang="scss">
.all-series {
    background: var(--white100);
    border-radius: 80px;
    width: 110px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: var(--primary-text-color);
    text-decoration: none;
    font-size: var(--font-size-6);
}
</style>