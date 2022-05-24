<script setup>
const props = defineProps({
  cardCount: {
    type: Number,
    default: null,
  },
  header: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="recent-episodes-skeleton">
    <div
      v-if="props.header || !!props.buttonText"
      class="col flex justify-content-between align-items-end mb-3"
    >
      <skeleton v-if="!!props.header" width="150px" height="32px" />
      <skeleton v-if="!!props.buttonText" width="105px" height="25px" />
    </div>
    <div class="grid justify-content-center">
      <div
        v-for="index in props.cardCount"
        :key="index"
        class="col-12 sm:col-6 lg:col-4 mb-6"
      >
        <skeleton class="card" width="100%" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$detailsHeight: 277px;
$cardHeight: 524px;
.recent-episodes-skeleton > .grid {
  margin: 0 -24px;
}
.recent-episodes-skeleton .grid > .col,
.recent-episodes-skeleton .grid > [class*='col'] {
  padding: 0 24px;
}
.recent-episodes-skeleton .grid .p-skeleton {
  border-radius: 20px;
}
.recent-episodes-skeleton .card {
  @include media('<md') {
    height: calc($detailsHeight + 31vw) !important;
  }
  @include media('<sm') {
    height: calc($detailsHeight + 60vw) !important;
  }
  @include media('>=md') {
    height: calc($detailsHeight + 30vw) !important;
  }
  @include media('>=lg') {
    height: calc($detailsHeight + 22vw) !important;
  }
  @include media('>xl') {
    height: $cardHeight !important;
  }
}
</style>
