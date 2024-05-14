<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'

useHead( {
  bodyAttrs: {
    class: 'has-head-color',
  },
} )

const body = ref( '' )
const dataLoaded = ref( false )

const props = defineProps( {
  api: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
} )

onBeforeMount( async () => {
  await axios
    .get( props.api )
    .then( ( response ) => {
      if ( response.data?.data?.attributes?.content ) {
        body.value = response.data.data.attributes.content
      } else {
        body.value = response.data?.included[ 0 ]?.attributes?.body
          ? response.data?.included[ 0 ]?.attributes?.body
          : response.data?.data?.attributes.about.body
      }
      dataLoaded.value = true
    } )
    .catch( () => {
      throwError()
    } )
} )
</script>

<template>
  <section class="head-color yellow">
    <div class="content thin-content-width">
      <template v-if="dataLoaded">
        <Html lang="en">
          <Head>
            <Title v-if="title">{{ title }} | Radiolab | WNYC Studios</Title>
            <Meta
              v-if="title"
              name="og:title"
              :content="`${title} | Radiolab | WNYC Studios`"
            />
            <Meta
              v-if="title"
              name="twitter:title"
              :content="`${title} | Radiolab | WNYC Studios`"
            />
          </Head>
        </Html>
        <div class="html-formatting" v-html="body" />
      </template>
      <skeleton-general-content v-else />
    </div>
  </section>
</template>
