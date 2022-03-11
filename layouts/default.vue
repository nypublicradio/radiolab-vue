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
    <radiolab-header />
    <main>
      <slot />
    </main>
    <radiolab-footer />
  </div>
</template>

<style lang="scss">
:root,
[data-color-mode="blue"] {
  --surface-ground: #0454d6;
  --link-button-color: var(--primary-light-color);
  --text-color: var(--white100);
  --text-color-secondary: var(--white300);
}
div,
span {
  &[data-color-mode="blue"] {
    .p-button:not(.p-button-text) {
      background: var(--white);
      color: #0454d6;
    }
  }
}
</style>
