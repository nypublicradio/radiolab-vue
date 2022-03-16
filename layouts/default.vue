<script setup>
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
</script>

<template>
  <div id="root" class="isPlayer">
    <radiolab-header />
    <main class="mb-100">
      <slot />
    </main>
    <radiolab-footer />
  </div>
</template>