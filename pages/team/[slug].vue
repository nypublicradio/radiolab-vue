<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { formatPublisherImageUrl } from '~/utilities/helpers'

const config = useRuntimeConfig()
const dataLoaded = ref(false)
const people = ref([])
const route = useRoute()

onBeforeMount(async () => {
  await axios
    .get(`${config.API_URL}/api/team/publisher/radiolab`)
    .then((response) => {
      people.value = response.data.included
      dataLoaded.value = true
    })
})

const matchingPerson = computed(() => {
  if (!people.value || !people.value.length) return null
  return people.value.find((p) => {
    // Check if attributes.person.slug matches the route.params.slug
    return p.attributes?.person?.slug === route.params.slug
  })
})
</script>

<template>
  <div class="team-member thin-content-width">
    <div v-if="dataLoaded && matchingPerson">
      <Html lang="en">
        <Head>
          <Title>
            {{ matchingPerson.attributes.person.name }} | Radiolab | WNYC
            Studios
          </Title>
          <Meta
            name="og:title"
            :content="`${matchingPerson.attributes.person.name} | Radiolab | WNYC Studios`"
          />
          <Meta
            name="og:image"
            :content="
              formatPublisherImageUrl(
                matchingPerson.attributes.person.image.template
              )
            "
          />
          <Meta
            name="og:image:width"
            :content="`${matchingPerson.attributes.person.image.image.w}`"
          />
          <Meta
            name="og:image:height"
            :content="`${matchingPerson.attributes.person.image.image.h}`"
          />
          <Meta
            name="twitter:title"
            :content="`${matchingPerson.attributes.person.name} | Radiolab | WNYC Studios`"
          />
          <Meta
            name="twitter:image"
            :content="matchingPerson.attributes.person.image.image.url"
          />
        </Head>
      </Html>
      <section class="mb-5">
        <div class="content pb-0">
          <div class="grid">
            <div class="col-12">
              <h1 class="h2 mt-4 mb-2 font-normal">
                {{ matchingPerson.attributes.person.name }}
              </h1>
              <h3 v-if="matchingPerson.attributes.person.jobTitle">
                {{ matchingPerson.attributes.person.jobTitle }}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="content mb-4 pt-0">
          <div>
            <img
              :src="matchingPerson.attributes.person.image.url"
              height="533"
              :alt="matchingPerson.attributes.person.name"
              class="mb-6"
            />
            <div
              v-html="
                matchingPerson.attributes.person.bio ||
                matchingPerson.attributes.person.lede
              "
              class="team-bio html-formatting"
            />
          </div>
        </div>
      </section>
    </div>
    <skeleton-general-content v-else />
  </div>
</template>

<style lang="scss" scoped>
.team-member img {
  max-width: 100%;
  height: auto;
}
</style>
