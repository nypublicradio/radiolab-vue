<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import Skeleton from 'primevue/skeleton'
const dataLoaded = ref(false)
const people = ref([])

useMeta({
  bodyAttrs: {
    class: 'has-head-color'
  }
})

onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/the-team/1?limit=50'
    )
    .then((response) => {
      people.value = response.data.included
      dataLoaded.value = true
    })
})
</script>

<template>
  <div class="team page">
    <section class="head-color lightblue">
      <div class="content">
        <div class="grid">
          <div class="col">
            <h1 class="mt-4 mb-2">The Team</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content">
        <div v-if="dataLoaded" class="grid">
          <div v-for="(person, index) in people" :key="index" class="col-12 md:col-6 xl:col-4 mb-8">
            <v-card
              :image="person.attributes.person.image.template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
              :alt="person.attributes.person.name"
              :title="person.attributes.person.name"
              :titleLink="`/team/${person.attributes.person.slug}`"
              :eyebrow="person.attributes['appearance-type']"
              :blurb="person.attributes.person.lede || person.attributes.person.bio"
              :max-width="person.attributes.person.image.w"
              :max-height="person.attributes.person.image.h"
              responsive
              :ratio="[4, 3]"
              bp="max"
              class="radiolab-card"
            />
          </div>
        </div>
        <skeleton v-else />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.team h1 {
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.team > .grid {
  margin: 0 -24px;
}

.team .grid > .col,
.team .grid > [class*="col"] {
  padding: 0 24px;
}

.team .card-eyebrow{
  text-transform: capitalize;
}
</style>