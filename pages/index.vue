<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const recentEpisodesApiUrl = `${config.API_URL}/api/show/radiolab`
const popularEpisodesApiUrl = `${config.API_URL}/api/v3/buckets/radiolab-popular-episodes/`
</script>

<template>
  <div>
    <latest-episode class="mb-4" />
    <episodes
      class="mb-4"
      header="Recent Episodes"
      button-text="All Episodes"
      button-link="/podcast"
      :row-count="1"
      :startCount="1"
      :api="recentEpisodesApiUrl"
      path="episodes.data"
    />
    <div class="htlad-radiolab_in-content_1 mb-8" />
    <cms-edit-button
      class="absolute left-0 right-0 w-full m-auto py-0 pl-3"
      style="max-width: 1366px"
      path="touts/bucket/1207507/"
      label="Edit exclusive content in the CMS"
    />
    <exclusive-content-from-the-lab class="mb-8" />
    <section class="mb-8">
      <div class="content">
        <div class="grid">
          <div class="col-12 md:col-6">
            <subscribe-to-the-newsletter
              ga-enter-viewport
              ga-info="homepage newsletter enters viewport"
            />
          </div>
          <div class="col-12 md:col-6">
            <listeners-cta />
          </div>
        </div>
      </div>
    </section>
    <cms-edit-button
      class="absolute left-0 right-0 w-full m-auto py-0 pl-3 xl:pl-8"
      style="max-width: 1366px"
      path="touts/bucket/1207018/"
      label="Edit popular episodes in the CMS"
    />
    <episodes
      header="Popular Episodes"
      button-text="All Popular"
      button-link="/popular"
      :row-count="1"
      :api="popularEpisodesApiUrl"
      path="data.data.attributes.bucket-items"
      bucket
      :bucket-limit="3"
    />
    <div class="htlad-radiolab_leaderboard_2 mb-8" />
  </div>
</template>
