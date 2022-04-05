<script setup>
</script>
 
<template>
  <div>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h2 class="mb-4">Radiolab for Kids</h2>
            <p class>
              Kid-friendly stories curated by Radiolab. All in one bingeable
              spot!
            </p>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      api="https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab-kids/recent_stories/"
      path="data.included"
      :paginate="true"
    />
  </div>
</template>

<style lang="scss">
</style>