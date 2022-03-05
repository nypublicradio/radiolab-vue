<script setup>
// import VTag from '~/node_modules/nypr-design-system-vue3/src/v2/components/VTag'
</script>

<template>
  <div>
    <div>home</div>
    <div class="md:hidden">primeflex test</div>
    <Button label="PrimeVue Button"></Button>
    <v2-v-tag name="tag" />
    <v2-v-tag name="news page" slug="/news" />
    <v2-v-tag name="google site" slug="https://www.google.com" />
    <!--     <v2-v-image-with-caption
      class="mt-4"
      style="max-width: 600px; margin: 0 auto"
      alt="Fallback alt text here"
      image="https://cms.demo.nypr.digital/images/212141/fill-%width%x%height%|format-jpeg|jpegquality-%quality%/"
      :width="600"
      :height="400"
      allowPreview
    />-->
  </div>
</template>

<style lang="scss">
</style>
