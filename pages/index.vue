<script setup>
import { ref } from 'vue'

const darkMode = ref(false)

</script>

<template>
  <div class="home-page page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <section>
      <div class="content">
        <div class="grid">
          <div class="col">
            <p>auto fit</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col">
            <p>auto fit</p>
          </div>
          <div class="col">
            <p>auto fit</p>
          </div>
          <div class="col">
            <p>auto fit</p>
          </div>
          <div class="col">
            <p>auto fit</p>
          </div>
          <div class="col">
            <p>auto fit</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="grid">
          <div class="col-12 md:col-4">
            <p>col-4</p>
          </div>
          <div class="col-12 md:col-8">
            <p>col-8</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  </div>
</template>

<style lang="scss">
.home-page .grid p {
  background-color: var(--surface-100);
  padding: spacing(2);
}
</style>
