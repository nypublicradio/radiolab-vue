<script setup>
import { ref, onMounted } from "vue"

const route = useRoute()
const darkMode = ref(false)
const atTop = ref(true)

useHead({
  title: `RadioLab | ${route.meta.title}`,
  meta: [
    {
      name: "description",
      content: "Investigating a strange world.",
    },
    {
      name: "keywords",
      content: "podcasts, npr, new york, WNYC Studios, arts, culture, classical, music, news, public, radio"
    },
    {
      name: "og:site_name",
      content: `Radiolab Podcasts | WNYC Studios`
    },
    {
      name: "og:title",
      content: `RadioLab | ${route.meta.title}`
    },
    {
      name: "og:url",
      content: `https://www.radiolab.org${route.fullPath}`
    },
    {
      name: "og:description",
      content: "Investigating a strange world."
    },
    {
      name: "og:type",
      content: "website"
    },
    {
      name: "og:image",
      content: "https://media.wnyc.org/i/1200/600/l/80/2020/09/Radiolab_OG_Image_Options_3.png"
    },
    {
      name: "og:image:width",
      content: "1200"
    },
    {
      name: "og:image:height",
      content: "600"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:site",
      content: "@radiolab"
    },
    {
      name: "twitter:title",
      content: `RadioLab | ${route.meta.title}`
    },
    {
      name: "twitter:description",
      content: "Investigating a strange world."
    },
    {
      name: "twitter:image",
      content: "https://media.wnyc.org/i/1200/600/l/80/2020/09/Radiolab_OG_Image_Options_3.png"
    },
    {
      name: "apple-itunes-app",
      content: "app-id=152249110, affiliate-data=at=1010lSme&amp;ct=radiolab"
    }
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
