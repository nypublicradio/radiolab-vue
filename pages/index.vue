<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
const pageBase = ref()
const toggleMode = () => {
  darkMode.value = !darkMode.value
}

</script>

<template>
  <div ref="pageBase" class="page-base" :data-theme="darkMode ? 'dark' : 'default'">
    <div>home</div>
    <div class="md:hidden">primeflex test</div>
    <Button label="PrimeVue Button"></Button>
    <v2-v-tag name="tag" />
    <v2-v-tag name="news page" slug="/news" />
    <v2-v-tag name="google site" slug="https://www.google.com" />
    <br />
    <br />
    <p>Dark Mode</p>
    <InputSwitch v-model="checked1" @click="toggleMode" />

    <v2-v-image-with-caption
      class="mt-4"
      style="max-width: 600px; margin: 0 auto"
      alt="Fallback alt text here"
      image="https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      credit="Credit Text Here"
      creditUrl="https://www.Credit-URL-Here.com"
      caption="Caption Text Here"
      title="Title Text Here"
      description="Description Text Here"
      :width="600"
      :height="400"
      allowPreview
    />
    <v2-v-simple-responsive-image
      class="mt-4"
      style="max-width: 600px; margin: 0 auto"
      alt="Fallback alt text here"
      src="https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      :width="600"
      :height="400"
    />
  </div>
</template>

<style lang="scss">
.page-base {
  background-color: var(--surface-ground);
}
</style>
