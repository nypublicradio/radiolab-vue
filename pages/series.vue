<script setup>

</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h1 class="page-header">Series</h1>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      api="https://private-anon-c9c388aa36-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/radio-shows/"
      path="data.included"
      :paginate="true"
    />
  </div>
</template>

<style lang="scss">
.series h1 {
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

.series > .grid {
  margin: 0 -24px;
}

.series .grid > .col,
.series .grid > [class*="col"] {
  padding: 0 24px;
}

.series .p-paginator {
  margin: auto;
}
</style>