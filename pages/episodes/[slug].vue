<script setup>
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const episode = ref([])
const route = useRoute()
onBeforeMount(async () => {
  await axios
    .get(
      `https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/story/${route.params.slug}/`
    )
    .then((response) => {
      episode.value = response.data.data.attributes
      dataLoaded.value = true
    })
})
</script>

<template>
  <div>
    <div v-if="dataLoaded" class="episode container">
      <img :src="episode['image-main'].url" :alt="episode['image-main'].alt-text" class="episode-image" />
      <p>{{ formatDate(episode['publish-at']) }}</p>
      <h1 v-html="episode.title" />
      <p v-html="episode.tease" />
    </div>
    <skeleton v-else />
  </div>
</template>

<style lang="scss">
.episode .episode-image {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
</style>