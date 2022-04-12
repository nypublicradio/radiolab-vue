<script setup>

</script>

<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h2>Radio Shows</h2>
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
</style>