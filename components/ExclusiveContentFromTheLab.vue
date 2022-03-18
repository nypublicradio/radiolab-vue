<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
const dataLoaded = ref(false)
const episodes = ref([])
onBeforeMount(async () => {
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
        <v-flexible-link class="become-a-member" to="/become-a-member"><button class="p-button-sm">Become a member</button></v-flexible-link>
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
.become-a-member button {
    background: var(--blue-500);
    color: var(--white100);
}
</style>