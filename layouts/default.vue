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
body {
  background: #ffffff;
}

:root,
[data-color-mode="blue"] {
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
      border-radius: 25px;
      border-color: #ffffff;
      margin-left: spacing(3);
      span {
        font-weight: 600;
      }
    }
    .p-inputtext {
      border-radius: 25px;
      background-color: rgba(10, 11, 12, 0.1);
      border: none;
      padding-left: spacing(6);
      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #f4f2f0;
        opacity: 0.4; /* Firefox */
      }
    }
  }
}
</style>
