<script setup>
import { ref } from "vue"
const isPlayer = ref(false)
useMeta({
  title: "RadioLab",
  meta: [
    {
      name: "description",
      content: "RadioLab website description.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
})

const props = defineProps({
  /*   propVar: {
      type: Boolean,
      default: false,
    }, */
})
</script>

<template>
  <div id="root" :class="[{ 'isPlayer': isPlayer }]">
    <radiolab-header />
    <main>
      <slot />
    </main>
    <radiolab-footer />
  </div>
</template>

<style lang="scss">
#root.isPlayer {
  padding-bottom: var(--player-height);
}
</style>
