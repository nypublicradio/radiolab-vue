<script setup>
const props = defineProps({
  rowCount: {
    type: Number,
    default: 1,
  },
})
const cardsPerRow = 3
const count = ref(props.rowCount * cardsPerRow + (props.rowCount % 2 ? 1 : 0))

const hideOnXl = (index) => {
  console.log('props.rowCount % 2 = ', props.rowCount % 2)
  return index % cardsPerRow && index === count.value
}
</script>

<template>
  <div class="recent-episodes-bucket-skeleton">
    <div class="grid">
      <div
        v-for="index in count"
        :key="index"
        class="col-12 md:col-6 xl:col-4 mb-6"
        :class="{
          'xl:hidden': hideOnXl(index),
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
.recent-episodes-bucket-skeleton > .grid {
  margin: 0 -24px;
}
.recent-episodes-bucket-skeleton .grid > .col,
.recent-episodes-bucket-skeleton .grid > [class*='col'] {
  padding: 0 24px;
}
.recent-episodes-bucket-skeleton .grid .p-skeleton {
  border-radius: 20px;
}
.recent-episodes-bucket-skeleton .card {
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
