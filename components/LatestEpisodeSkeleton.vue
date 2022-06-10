<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="latest-episode-skeleton">
    <div class="grid grid-nogutter holder">
      <div ref="refThisImg" class="col-12 md:col-7 p-0">
        <skeleton width="100%" class="latest-episode-skeleton-image" />
      </div>
      <div
        class="col-12 md:col-5 p-4 lg:p-5 xl:p-7 latest-episode-skeleton-content flex flex-column justify-content-center"
      >
        <skeleton width="10rem" class="mt-2 mb-2" />
        <skeleton width="100%" height="50px" class="mb-3" />
        <skeleton width="100%" height="72px" class="mb-6" />
        <div class="flex justify-content-between">
          <skeleton width="5rem" class="mb-2" />
          <skeleton width="5rem" class="mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.latest-episode-skeleton {
  width: 100%;
  .holder {
    border-radius: 20px;
    position: relative;
    display: flex;
    overflow: hidden;

    .p-skeleton {
      border-radius: 0px;
    }
  }
  .latest-episode-skeleton-image {
    @include media('<md') {
      height: calc(80vw - 5rem) !important;
    }
    @include media('>=md') {
      height: 40vw !important;
    }
    @include media('>xl') {
      height: 544px !important;
    }
  }
  .latest-episode-skeleton-content {
    background: var(--white100);
  }
}
</style>
