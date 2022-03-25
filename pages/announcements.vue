<script setup>
useMeta({
  meta: [
    {
      name: 'theme-color',
      content: '#90d8fc',
    },
  ],
  bodyAttrs: {
    class: 'has-head-color'
  }
})
</script>

<template>
  <div>
    <section class="graphic-head flex justify-content-center align-content-center">
      <h1 class="page-header text-center font-semibold">Announcements</h1>
    </section>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col-12">
            <h1 class="page-header">Announcements</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.announcements {
  .graphic-head {
    background-color: var(--lightblue-500);
    background-image: url("/rl-icon-on-blue2.svg");
  }
}
</style>