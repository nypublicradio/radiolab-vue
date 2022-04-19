<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const dataLoaded = ref(false)
const episodes = ref([])

onBeforeMount(async () => {
  await axios
    .get(
      `${config.API_URL}/api/v3/buckets/radiolab-radio-shows/?limit=3`
    )
    .then((response) => {
      episodes.value = response.data.data.attributes['bucket-items']
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <section>
    <div class="content">
      <div class="grid">
        <div class="col">
          <div>
            <div class="flex justify-content-between">
              <h3 class="mb-4">Exclusive content from The Lab</h3>
              <v-flexible-link raw class="the-lab" to="/the-lab">
                <Button class="p-button-rounded p-button-sm">Become a member</Button>
              </v-flexible-link>
            </div>
            <div v-if="dataLoaded" class="grid">
              <div
                v-for="(episode, index) in episodes.slice(0, 3)"
                :key="index"
                class="col-12 xl:col-4 mb-2"
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
            <mini-card-skeleton v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
/* .exclusive-content-from-the-lab .become-a-member .p-button {
  background: var(--blue-500);
  color: var(--white100);
} */
</style>