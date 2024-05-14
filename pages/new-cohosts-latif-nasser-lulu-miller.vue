<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
</script>

<template>
  <flat-page
    title="New Co-Hosts: Latif Nasser & Lulu Miller"
    :api="`${config.API_URL}/api/v3/channel/shows/radiolab/new-cohosts-latif-nasser-lulu-miller`"
  />
</template>
