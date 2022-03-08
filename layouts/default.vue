<script setup>
//import { onMounted, ref } from "vue";

useMeta({
  title: "RadioLab",
  meta: [
    {
      name: "description",
      content: "RadioLab website description.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
})

const props = defineProps({
  /*   propVar: {
      type: Boolean,
      default: false,
    }, */
})
</script>

<template>
  <div id="root" class="isPlayer">
    <div class="header">header</div>
    <main>
      <slot />
    </main>
    <div class="footer">footer</div>
  </div>
</template>

<style lang="scss">
</style>
