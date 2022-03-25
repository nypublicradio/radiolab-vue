<script setup>
import { onBeforeMount, ref } from 'vue'

</script>
 
<template>
  <div>
    <section>
      <div clss="content">
        <div class="grid">
          <div class="col">
            <div class="episode-archive">
              <h1>Episode Archive</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      api="https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/recent_stories/"
      path="data.included"
      paginate="true"
    />
  </div>
</template>

<style lang="scss">
.episode-archive h1 {
  font-size: var(--font-size-16);
  line-height: var(--font-size-16);
}

/* .episode-archive .image-with-caption-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
  overflow-y: hidden;
} */

.episode-archive > .grid {
  margin: 0 -24px;
}

.episode-archive .grid > .col,
.episode-archive .grid > [class*="col"] {
  padding: 0 24px;
}

.episode-archive .p-paginator {
  margin: auto;
}
</style>