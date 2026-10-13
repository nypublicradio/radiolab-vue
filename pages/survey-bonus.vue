<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    title="Knology Bonus Content"
    :api="`${config.API_URL}/api/v3/flatpages/1482/`"
  />
</template>
