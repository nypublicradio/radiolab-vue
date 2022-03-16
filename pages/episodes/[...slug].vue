<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from '~/utilities/helpers'
import axios from 'axios'
const dataLoaded = ref(false)
const episode = ref([])
const route = useRoute()
onMounted(async () => {
  await axios
    .get(
      `https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/story/${route.params.slug[0]}/`
    )
    .then((response) => {
      episode.value = response.data.data.attributes
      dataLoaded.value = true
    })
})
</script>

<template>
  <div>
    <div v-if="dataLoaded" class="episode">
      <img :src="episode['image-main'].url" :alt="episode['image-main'].alt-text" class="episode-image" />
      <p>{{ formatDate(episode['publish-at']) }}</p>
      <h1 v-html="episode.title" />
      <p v-html="episode.tease" />
    </div>
    <p v-else>Loading animation goes here!</p>
  </div>
</template>

<style lang="scss">
.episode .episode-image {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
</style>