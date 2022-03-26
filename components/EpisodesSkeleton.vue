<script setup>

const props = defineProps({
  rowCount: {
    type: Number,
    default: 4,
  },
  header: {
    type: String,
    default: false,
  },
  buttonText: {
    type: String,
    default: false,
  },

})

</script>

<template>
  <div class="recent-episodes-skeleton">
    <div
      v-if="props.header || props.buttonText"
      class="col flex justify-content-between align-items-end mb-3"
    >
      <skeleton v-if="props.header" width="150px" height="32px" />
      <skeleton v-if="props.buttonText" width="105px" height="25px" />
    </div>
    <div class="grid">
      <div
        v-for="index in props.rowCount - 1"
        :key="index"
        class="col-12 md:col-6 xl:col-4 mb-5"
        :class="{ 'xl:hidden': rowCount % 2 && index === props.rowCount - 1 }"
      >
        <skeleton width="100%" height="505px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.recent-episodes-skeleton > .grid {
  margin: 0 -24px;
}
.recent-episodes-skeleton .grid > .col,
.recent-episodes-skeleton .grid > [class*="col"] {
  padding: 0 24px;
}
.recent-episodes-skeleton .grid .p-skeleton {
  border-radius: 20px;
}
</style>
