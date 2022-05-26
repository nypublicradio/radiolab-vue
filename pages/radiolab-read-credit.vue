<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    :api="`${config.API_URL}/api/v3/channel/shows/radiolab/radiolab-read-credit`"
  />
</template>
