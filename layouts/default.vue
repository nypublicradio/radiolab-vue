<script setup>
import { ref, onMounted } from "vue"
import { useScroll } from '@vueuse/core'
import PullToRefresh from 'pulltorefreshjs'

const route = useRoute()
const darkMode = ref(false)
const el = ref(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  offset: { top: 0, bottom: 100, right: 0, left: 0 }
})

useMeta({
  title: "RadioLab",
  meta: [
    {
      name: "description",
      content: "RadioLab website description.",
    },
  ],
})

onMounted(() => {
  PullToRefresh.init({
    mainElement: '#body',
    triggerElement: '#body',
    shouldPullToRefresh: () => el.value.scrollTop == 0,
    onRefresh() {
      window.location.reload()
    }
  })
})

</script>

<template>
  <div
    id="body"
    class="page"
    :class="[`${route.name}`]"
    ref="el"
    :data-style-mode="darkMode ? 'dark' : 'default'"
  >
    <radiolab-header :class="[{ 'at-top': arrivedState.top }]" />
    <main>
      <slot />
    </main>
    <radiolab-footer />
    <audio-player :class="[{ 'at-bottom': arrivedState.bottom }]" />
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
}

// pull to refresh styles
.ptr--ptr {
  background-color: var(--primary-color);
  * {
    font-family: var(--font-family);
    font-size: 1rem;
  }
}
</style>
