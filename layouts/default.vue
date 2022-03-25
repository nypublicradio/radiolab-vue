<script setup>
import { ref } from "vue"
import { useScroll } from '@vueuse/core'
const route = useRoute()

const darkMode = ref(false)

const el = ref(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
const isPlayer = ref(false)
useMeta({
  title: "RadioLab",
  meta: [
    {
      name: "description",
      content: "RadioLab website description.",
    },
  ],
})
</script>

<template>
  <div
    id="body"
    class="page"
    :class="[`${route.name}`, { 'isPlayer': isPlayer }]"
    ref="el"
    :data-style-mode="darkMode ? 'dark' : 'default'"
  >
    <radiolab-header :class="[{ 'at-top': arrivedState.top }]" />
    <main>
      <slot />
    </main>
    <radiolab-footer />
  </div>
</template>

<style lang="scss">
body,
html {
  overflow: hidden;
}
#body {
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  #root {
    // overflow-y: scroll;
    &.isPlayer {
      padding-bottom: var(--player-height);
    }
  }
}
</style>
