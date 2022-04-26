<script setup>
import Skeleton from 'primevue/skeleton'
import RadiolabLogo from '~/components/icons/RadiolabLogo.vue'
</script>

<template>
  <div class="content lg:pl-4">
    <div
      class="hidden lg:flex header-menu-skeleton align-items-center w-full justify-content-between"
    >
      <radiolab-logo class="logo mr-2" />
      <div class="inline-flex align-items-center" style="gap: 35px">
        <skeleton width="80px" />
        <skeleton width="60px" />
        <skeleton width="104px" />
      </div>
      <div class="inline-flex align-items-center" style="gap: 12px">
        <skeleton width="100px" />
        <skeleton width="186px" height="40px" />
      </div>
    </div>

    <div
      class="flex lg:hidden header-menu-skeleton align-items-center w-full justify-content-between"
    >
      <div class="flex align-items-center">
        <skeleton class="hamburger" width="15px" height="15px" />
        <radiolab-logo class="logo" />
      </div>
      <div class="inline-flex align-items-center" style="gap: 12px">
        <skeleton width="170px" height="40px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.header-menu-skeleton {
  height: var(--header-height);
  padding: 1rem 0.5rem;
  .p-skeleton {
    border-radius: 2rem;
  }
  .radiolab-logo {
    height: auto;
    width: 100px;
  }
  .cluster {
    gap: 12px;
  }
  .hamburger {
    border-radius: 0;
    margin: 0 8.5px;
  }
}
</style>
