<script setup>
const props = defineProps({
  isTranscript: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <div class="episode-tools-skeleton flex flex-wrap">
      <div class="play-group">
        <skeleton class="play" width="101.13px" height="40px" />
        <skeleton class="dd" width="80px" height="40px" />
      </div>
      <skeleton v-if="!props.isTranscript" width="93.16px" height="40px" />
      <skeleton width="40px" height="40px" />
      <skeleton width="40px" height="40px" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-tools-skeleton {
  gap: 6px;
  .p-skeleton {
    border-radius: 2rem;
  }
  .play-group {
    display: flex;
    gap: 6px;
    @include media('<472px') {
      width: 100%;
      .play {
        width: 75% !important;
      }
      .dd {
        //width: 25% !important;
      }
    }
  }
}
</style>
