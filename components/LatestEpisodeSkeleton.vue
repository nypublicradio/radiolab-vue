<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="latest-episode-skeleton">
    <div class="grid">
      <div class="col col-12 xl:col-7 p-0">
        <skeleton width="100%" height="500px" class="latest-episode-skeleton-image" />
      </div>
      <div class="col col-12 xl:col-5 p-7 latest-episode-skeleton-content">
        <skeleton width="10rem" class="mt-2 mb-2" />
        <skeleton width="100%" height="50px" class="mb-3" />
        <skeleton width="100%" height="72px" class="mb-6" />
        <skeleton width="10rem" class="mb-2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.latest-episode-skeleton {
  width: 100%;
  margin-bottom: 100px;
}

.latest-episode-skeleton-image {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.latest-episode-skeleton-content {
  background: var(--white100);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
