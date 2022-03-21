<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
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
  <section>
    <div class="content px-0 pt-2">
      <div class="grid">
        <div class="col">
          <div class="exclusive-content-from-the-lab">
            <div class="flex justify-content-between">
              <h3 class="mb-4">Exclusive content from The Lab</h3>
              <v-flexible-link raw class="become-a-member" to="/become-a-member">
                <Button class="p-button-rounded p-button-sm">Become a member</Button>
              </v-flexible-link>
            </div>
            <div v-if="dataLoaded" class="grid">
              <div
                v-for="(episode, index) in episodes.slice(0, 3)"
                :key="index"
                class="col-12 xl:col-4"
              >
                <mini-card
                  :image="episode.attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
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
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.exclusive-content-from-the-lab .become-a-member .p-button {
  background: var(--blue-500);
  color: var(--white100);
}
</style>