<script setup>
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab/radio-shows/`
</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h2>Series</h2>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      :api="apiUrl"
      path="data.included"
      :paginate="true"
    />
  </div>
</template>

<style lang="scss">
</style>