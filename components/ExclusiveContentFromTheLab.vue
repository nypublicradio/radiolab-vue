<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const episodes = ref([])
onMounted(async () => {
  await axios
    .get(
      'https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/buckets/radiolab-radio-shows/?limit=3'
    )
    .then((response) => {
      episodes.value = response.data.data.attributes['bucket-items']
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <div class="exclusive-content-from-the-lab container">
    <div class="flex justify-content-between">
      <h3 class="mb-4">Exclusive content from The Lab</h3>
      <nuxt-link class="become-a-member" to="/episodes">Become a member</nuxt-link>
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
.become-a-member {
    background: var(--blue-500);
    border-radius: 80px;
    width: 163px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: var(--white100);
    text-decoration: none;
    font-size: var(--font-size-6);
}
</style>