<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    title="Radiolab Survey Bonus"
    :api="`${config.API_URL}/api/v3/flatpages/1482/`"
  />
</template>
