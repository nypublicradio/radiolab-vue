<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    :api="`${config.API_URL}/api/pages/publisher/15957`"
    title="About"
  />
</template>
