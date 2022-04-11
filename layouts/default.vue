<script setup>
import { ref, onMounted } from "vue"

const route = useRoute()
const darkMode = ref(false)
const atTop = ref(true)

useHead({
  title: "RadioLab",
  meta: [
    {
      name: "description",
      content: "RadioLab website description.",
    },
  ],
})

onMounted(() => {
  document.addEventListener('scroll', (e) => {
    atTop.value = window.scrollY > 0 ? false : true
    //atBottom.value = ((window.scrollY + (window.innerHeight + 115) >= document.body.scrollHeight)) ? true : false
  })
})
</script>

<template>
  <div class="page" :class="[`${route.name}`]" :data-style-mode="darkMode ? 'dark' : 'default'">
    <radiolab-header :class="[{ 'at-top': atTop }]" />
    <main>
      <slot />
    </main>
    <radiolab-footer />
    <audio-player />
  </div>
</template>

<style lang="scss">
body,
html {
  overflow-y: auto;
  overflow-x: hidden;
}

main {
  padding-top: var(--header-height);
}
</style>
