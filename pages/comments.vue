<script setup>
useMeta({
  bodyAttrs: {
    class: 'has-head-color',
  },
})
</script>

<template>
  <div class="about page" :data-style-mode="darkMode ? 'dark' : 'default'">
    <section class="head-color yellow">
      <div class="content text-center">
        <h1>Comments Policy</h1>
      </div>
    </section>
    <section>
      <div class="content">
        <p class="mb-3">
          We love hearing from our listeners and appreciate your feedback--you
          are why we do what we do. Like many other content creators, however,
          we've realized that the comments section on our website was not
          providing a useful experience for most of our listeners. So, after
          much careful consideration, we've decided to close our comments
          section. Instead, we'd like to continue the conversation with you via
          <a
            href="https://twitter.com/radiolab"
            target="_blank"
            rel="noopener noreferrer"
            >Twitter</a
          >,
          <a
            href="https://www.facebook.com/Radiolab/"
            target="_blank"
            rel="noopener noreferrer"
            >Facebook</a
          >
          and, of course, through email at
          <a href="mailto:radiolab@wnyc.org">radiolab@wnyc.org</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.about textarea {
  padding: 1rem;
  width: 100%;
  max-width: 500px;
}
</style>
