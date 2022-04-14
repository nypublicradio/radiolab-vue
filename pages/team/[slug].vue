<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const person = ref([])
const route = useRoute()
onBeforeMount(async () => {
  await axios
    .get(
      `https://private-anon-d1d00d4480-nyprpublisher.apiary-proxy.com/api/v3/person/${route.params.slug}/`
    )
    .then((response) => {
      person.value = response.data.data.attributes
      dataLoaded.value = true
    })
    .catch(() => {
      navigateTo('/400')
    })
})
</script>

<template>
  <div class="thin-content-width">
    <section class="mb-5">
      <div class="content pb-0">
        <div class="grid">
          <div class="col-12">
            <h2 class="mt-4 mb-2">{{ person.name }}</h2>
            <h3 v-if="person['job-title']">{{ person['job-title'] }}</h3>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content mb-4 pt-0">
        <div v-if="dataLoaded">
          <v-image-with-caption
            :image="
              person.image.template.replace(
                '%s/%s/%s/%s',
                '%width%/%height%/c/%quality%'
              )
            "
            :alt="person.name"
            :max-width="person.image.w"
            :max-height="person.image.h"
            :ratio="[8, 5]"
            class="mb-6"
          />
          <div v-html="person.bio || person.lede" class="team-bio html-formatting" />
        </div>
        <skeleton v-else />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
</style>