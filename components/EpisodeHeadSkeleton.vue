<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="episode-head-skeleton flex align-items-center">
    <skeleton class="episode-head-skeleton-image mr-2 md:mr-4" />
    <div class="episode-head-skeleton-content">
      <div class="block md:hidden">
        <skeleton width="5rem" height="13px" class="mb-2" />
        <skeleton width="100%" height="24px" class="mb-0 md:mb-5" />
      </div>
      <div class="hidden md:block">
        <skeleton width="7rem" class="mb-2" />
        <skeleton width="100%" height="40px" class="mb-0 md:mb-5" />
      </div>
      <episode-tools-skeleton class="hidden md:flex" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-head-skeleton {
  margin-bottom: 100px;
  .episode-head-skeleton-image {
    width: 200px !important;
    height: 200px !important;
    @include media("<md") {
      width: 90px !important;
      height: 90px !important;
    }
    border-radius: 20px;
  }
  .episode-head-skeleton-content {
    flex-grow: 1;
  }
}
</style>
