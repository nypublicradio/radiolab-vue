<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import VCard from 'nypr-design-system-vue3/v2/src/components/VCard.vue'
import ApplePodcasts from '~/components/icons/ApplePodcasts.vue'
const dataLoaded = ref(false)
const episodes = ref([])
const errorMessage = ref(null)
onMounted(async () => {
  await axios
    .get(
      'https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/buckets/radiolab-radio-shows/?limit=3'
    )
    .then((response) => {
      episodes.value = response.data
      dataLoaded.value = true
    })
    .catch((error) => {
      console.log(error)
      errorMessage.value = error
    })
})
</script>
 
<template>
 {{episodes}}
</template>

<style lang="scss">
.popular-episodes .popular-episodes-podcasts {
  display: flex;
  align-content: flex-start;
  text-transform: uppercase;
  svg {
    margin-right: 7px;
    width: 18px;
    height: 18px;
  }
}

.popular-episodes  {
  margin: 0 115px;
  @include media("<xl") {
    margin: 0;
  }
}

.popular-episodes > .grid {
  margin: 0 -45px;
}

.popular-episodes .grid>.col,
.popular-episodes .grid>[class*=col] {
  padding: 0 45px;
}

.popular-episodes .v-card {
  background: #F4F2F0;
  border-radius: 20px;
  box-shadow: none;
}

.popular-episodes .v-card .card-details {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 2.25rem;
}

.popular-episodes .v-card .card-subtitle {
  display: flex;
  order: 1;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.popular-episodes .v-card .card-title,
.popular-episodes .v-card .card-slot {
  order: 2;
}

.all-episodes {
  background: #F4F2F0;
  border-radius: 80px;
  width: 110px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #0A0B0C;
  text-decoration: none;
  font-size: 16px;
}
</style>