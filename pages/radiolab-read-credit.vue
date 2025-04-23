<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    title="Read The Radiolab Credits"
    :api="`${config.API_URL}/api/pages/publisher/1239/`"
  />
</template>
