<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div>
    <div class="episode-tools-skeleton flex flex-wrap">
      <skeleton width="95px" height="37.7px" />
      <skeleton width="80px" height="37.7px" />
      <skeleton width="93px" height="37.7px" />
      <skeleton width="37.7px" height="37.7px" />
      <skeleton width="37.7px" height="37.7px" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-tools-skeleton {
  gap: 6px;
  .p-skeleton {
    border-radius: 2rem;
  }
}
</style>
