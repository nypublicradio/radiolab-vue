<script setup>
import { useRuntimeConfig } from '#app'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
useMeta({
  bodyAttrs: {
    class: 'has-head-color',
  },
})
const dataLoaded = ref(false)
const page = ref([])
const router = useRouter()
const config = useRuntimeConfig()

onBeforeMount(async () => {
  await axios
    .get(`${config.API_URL}/api/v3/flatpages/1259/`)
    .then((response) => {
      page.value = response.data.data.attributes
      dataLoaded.value = true
    })
    .catch(() => {
      router.push('/404')
    })
})
</script>

<template>
  <div>
    <section class="head-color yellow">
      <div class="content thin-content-width">
        <template v-if="dataLoaded">
          <Html>
            <Head>
              <Title>Series | Radiolab | WNYC Studios</Title>
              <Meta
                name="og:title"
                content="Series | Radiolab | WNYC Studios"
              />
              <Meta
                name="twitter:title"
                content="Series | Radiolab | WNYC Studios"
              />
            </Head>
          </Html>
          <div
            class="html-formatting"
            v-html="page['superchunk-head-plus-content']"
          />
        </template>
        <skeleton-general-content v-else />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.series .projects-landing-page__project {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  grid-template-areas:
    'logo title'
    'logo description';
  margin-bottom: 46px;
}
.projects-landing-page__image {
  width: 244px;
  height: 244px;
  grid-area: logo;
}
.projects-landing-page__project a {
  font-family: var(--font-family-header);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-500);
  line-height: 28px;
  grid-area: title;
  align-self: end;
  text-decoration: none;
  color: var(--text-color);
  transition: all var(--transition-duration);
  &:hover {
    color: var(--link-button-hover-color) !important;
    text-decoration: underline;
  }
}
.projects-landing-page__project p {
  grid-area: description;
}
</style>
