<script setup>
//
import { ref, onMounted, onUnmounted } from 'vue'
import { useRuntimeConfig } from '#app'
//import { isElementXPercentInViewport } from '../utilities/helpers.js'

const config = useRuntimeConfig()
const route = useRoute()
const darkMode = ref(false)
const atTop = ref(true)
const scrollSentinel = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      atTop.value = entry.isIntersecting
    })
  })
  observer.observe(scrollSentinel.value)

  // Ads
  window.htlbid = window.htlbid || {}
  htlbid.cmd = htlbid.cmd || []
  htlbid.cmd.push(function () {
    htlbid.layout('universal') // Leave as 'universal' or add custom layout
    htlbid.setTargeting('is_testing', config.HTL_IS_TESTING) // Set to "no" for production
    htlbid.setTargeting('is_home', route.name === 'index' ? 'yes' : 'no') // Set to "yes" on the homepage
    htlbid.setTargeting('category', route.name) // dynamically pass page category into this function
    htlbid.setTargeting('post_id', route.name) // dynamically pass unique post/page id into this function
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

useHead({
  script: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${config.GA_MEASUREMENT_ID}`,
      async: true,
    },
    {
      src: config.HTL_JS,
      async: true,
    },
  ],
  noscript: [
    {
      children: `<iframe src=&quot;https://www.googletagmanager.com/ns.html?id=${config.GTM_ID}&quot;
    height=&quot;0&quot; width=&quot;0&quot; style=&quot;display:none;visibility:hidden&quot;></iframe>`,
    },
  ],
})
</script>

<template>
  <div
    class="page"
    :class="[`${route.name}`]"
    :data-style-mode="darkMode ? 'dark' : 'default'"
  >
    <Html lang="en">
      <Head>
        <Link rel="canonical" :href="`https://radiolab.org${route.path}`" />
        <Link rel="stylesheet" :href="config.HTL_CSS" type="text/css" />
        <Title>Radiolab: Podcasts | WNYC Studios | Podcasts</Title>
        <Meta name="description" content="Investigating a strange world." />
        <Meta
          name="keywords"
          content="podcasts, npr, new york, WNYC Studios, arts, culture, classical, music, news, public, radio"
        />
        <Meta name="og:site_name" content="Radiolab Podcasts | WNYC Studios" />
        <Meta name="og:type" content="website" />
        <Meta
          name="og:url"
          :content="`https://www.radiolab.org${route.fullPath}`"
        />
        <Meta
          name="og:title"
          content="Radiolab: Podcasts | WNYC Studios | Podcasts"
        />
        <Meta name="og:description" content="Investigating a strange world." />
        <Meta
          name="og:image"
          content="https://radiolab.org/og-default-image.png"
        />
        <Meta
          name="og:image:alt"
          content="Radiolab: Podcasts | WNYC Studios | Podcasts"
        />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="600" />
        <Meta name="fb:app_id" content="151261804904925" />
        <Meta
          name="fb:pages"
          content="224921207956535"
          data-detail="WNYC Studios"
        />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@radiolab" />
        <Meta
          name="twitter:title"
          content="Radiolab: Podcasts | WNYC Studios | Podcasts"
        />
        <Meta
          name="twitter:description"
          content="Investigating a strange world."
        />
        <Meta
          name="twitter:image"
          content="https://radiolab.org/og-default-image.png"
        />
        <Meta
          name="apple-itunes-app"
          content="app-id=152249110, affiliate-data=at=1010lSme&amp;ct=radiolab"
        />
      </Head>
    </Html>
    <div
      class="leaderboard-ad-wrapper flex justify-content-center align-items-center flex-column"
    >
      <div class="leaderboard-ad-wrapper-inner">
        <div class="htlad-radiolab_adhesion" />
      </div>
    </div>
    <div class="scrollSentinel" ref="scrollSentinel" />
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
  overflow-x: clip;
}

.leaderboard-ad-wrapper {
  z-index: 1;
  background: #111111;
  padding: 0;
  @include media('<md') {
    min-height: $leaderboardHeightMobile;
    position: sticky;
    top: 0;
    z-index: 5000;
  }
  @include media('>=md') {
    position: relative;
    min-height: 92px;
    padding: 1px 0;
  }
}

.leaderboard-ad-wrapper-inner {
  min-width: 300px;
  min-height: $leaderboardHeightMobile;
  @include media('>=md') {
    min-width: 728px;
    min-height: $leaderboardHeight;
  }
}

.scrollSentinel {
  height: 0;
  @include media('<md') {
    position: absolute;
    top: 0px;
  }
}
</style>
