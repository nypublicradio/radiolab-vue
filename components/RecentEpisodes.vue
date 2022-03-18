<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
const dataLoaded = ref(false)
const episodes = ref([])
onBeforeMount(async () => {
  await axios
    .get(
      'https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/1?limit=4'
    )
    .then((response) => {
      episodes.value = response.data.included
      dataLoaded.value = true
    })
})
</script>
 
<template>
  <div>
    <div v-if="dataLoaded" class="latest-episode grid justify-content-center">
      <div class="col-12 xl:col-8 p-0">
        <v-image-with-caption
          :image="episodes[0].attributes['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
          :imageUrl="`/episodes/${episodes[0].attributes.slug}`"
          :alt="episodes[0].attributes['image-main']['alt-text']"
          :max-width="episodes[0].attributes['image-main'].w"
          :max-height="episodes[0].attributes['image-main'].h"
          :ratio="[4, 3]"
          class="latest-episode-image"
        />
      </div>
      <div class="latest-episode-content col-12 xl:col-4 p-8">
        <p class="latest-episode-header mb-2">Latest Episode</p>
        <h2 class="mb-4">
          <nuxt-link
            :to="`/episodes/${episodes[0].attributes.slug}`"
            v-html="episodes[0].attributes.title"
            class="latest-episode-title"
          />
        </h2>
        <p v-html="episodes[0].attributes.tease" class="latest-episode-tease mb-5" />
        <p class="latest-episode-podcasts">
          <apple-podcasts />Apple Podcasts
        </p>
      </div>
    </div>
    <latest-episode-skeleton v-else />
    <div class="recent-episodes container">
      <div class="flex justify-content-between">
        <h3 class="mb-4">Recent Episodes</h3>
        <v-flexible-link to="/episodes"><button class="p-button-sm">All Episodes</button></v-flexible-link>
      </div>
      <div v-if="dataLoaded" class="grid">
        <div v-for="(episode, index) in episodes.slice(1,4)" :key="index" class="col-12 xl:col-4 mb-5">
          <v-card
            :image="episode.attributes['image-main'].url"
            :alt="episode.attributes['image-main']['alt-text']"
            :title="episode.attributes.title"
            :titleLink="`/episodes/${episode.attributes.slug}`"
            :subtitle="formatDate(episode.attributes['publish-at'])"
            :height="225"
            :max-width="episode.attributes['image-main'].w"
            :max-height="episode.attributes['image-main'].h"
            responsive
            :ratio="[4, 3]"
            bp="max"
            class="radiolab-card"
          >
            <p v-html="episode.attributes.tease" class="mb-5" />
            <p class="radiolab-card-podcasts">
              <apple-podcasts />Apple Podcasts
            </p>
          </v-card>
        </div>
      </div>
      <skeleton v-else />
    </div>
  </div>
</template>

<style lang="scss">
.latest-episode {
  max-width: 100%;
  margin-bottom: 100px;
}

.latest-episode .latest-episode-title {
  color: var(--primary-text-color);
  text-decoration: none;
  font-weight: 400;
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.latest-episode .latest-episode-image {
  max-height: 500px;
  max-width: 100%;
  height: auto;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.latest-episode .latest-episode-content {
  background: var(--white100);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.latest-episode .latest-episode-header {
  font-size: var(--font-size-5);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.latest-episode-tease {
  font-size: var(--font-size-6);
  line-height: 24px;
}

.latest-episode .latest-episode-podcasts {
  display: flex;
  align-content: flex-start;
  text-transform: uppercase;
  font-size: var(--font-size-8);
  svg {
    margin-right: 7px;
  }
}

.recent-episodes  {
  padding: 0 115px;
  @include media("<xl") {
    padding: spacingXY(6, 4);
  }
}

.recent-episodes > .grid {
  margin: 0 -33px;
}

.recent-episodes .grid > .col,
.recent-episodes .grid > [class*="col"] {
  padding: 0 33px;
}
</style>