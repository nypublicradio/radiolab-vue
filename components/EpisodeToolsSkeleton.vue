<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div>
    <div class="episode-tools-skeleton flex">
      <skeleton width="64px" height="30px" />
      <skeleton width="98px" height="30px" />
      <skeleton width="30px" height="30px" />
      <skeleton width="30px" height="30px" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-tools-skeleton {
  gap: 5px;
  .p-skeleton {
    border-radius: 2rem;
  }
}
</style>
