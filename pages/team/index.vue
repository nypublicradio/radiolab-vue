<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/the-team/1?limit=50'
    )
    .then((response) => {
      people.value = response.data.included
      totalCount.value = response.data.data.attributes['total-count']
      dataLoaded.value = true
    })
})
</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h2>The Team</h2>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content lg:px-8 cards">
        <div v-if="dataLoaded" class="grid">
          <div v-for="(person, index) in people" :key="index" class="col-12 md:col-6 xl:col-4 mb-6">
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
        <episodes-skeleton v-else :row-count="30" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.team .cards > .grid {
  margin: 0 -24px;
}

.team .cards .grid > .col,
.team .cards .grid > [class*="col"] {
  padding: 0 24px;
}

.team .cards .card-eyebrow {
  text-transform: capitalize;
}
</style>