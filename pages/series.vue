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
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h1 class="h2">Series</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="">
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
  @include media('>md') {
    display: grid;
    margin-bottom: 46px;
    grid-column-gap: 20px;
    grid-template-rows: auto auto;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'logo title'
      'logo description';
  }
}
.projects-landing-page__image {
  grid-area: logo;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  @include media('>md') {
    width: 244px;
    height: 244px;
    margin-bottom: 0;
  }
}
.projects-landing-page__project a {
  grid-area: title;
  font-family: var(--font-family-header);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-500);
  line-height: 28px;
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
  margin-bottom: 40px !important;
  @include media('>md') {
    margin-bottom: 0 !important;
  }
}
</style>
