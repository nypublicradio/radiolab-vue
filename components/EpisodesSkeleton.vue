<script setup>
const props = defineProps({
  cardCount: {
    type: Number,
    default: 4,
  },
  header: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  paginate: {
    type: Boolean,
    default: false,
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
    <div class="grid">
      <div
        v-for="index in props.cardCount - (paginate ? 0 : 1)"
        :key="index"
        class="col-12 md:col-6 xl:col-4 mb-6"
        :class="{
          'xl:hidden': props.cardCount % 2 && index === props.cardCount - 1,
        }"
      >
        <skeleton class="card" width="100%" />
        <!-- height="527px" -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$detailsHeight: 250px;
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
    height: calc($detailsHeight + 67.2vw) !important;
  }
  @include media('<sm') {
    height: calc($detailsHeight + 65.5vw) !important;
  }
  @include media('>md') {
    height: calc($detailsHeight + 33.85vw) !important;
  }
  @include media('>lg') {
    height: calc($detailsHeight + 30.55vw) !important;
  }
  @include media('>xl') {
    height: $cardHeight !important;
  }
}
</style>
