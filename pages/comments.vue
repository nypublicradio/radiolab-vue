<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Comments Policy | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Comments Policy | Radiolab | WNYC Studios"
        />
        <Meta
          name="twitter:title"
          content="Comments Policy | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2 mb-5 font-normal">Comments Policy</h1>
            <p class="mb-3">
              We love hearing from our listeners and appreciate your
              feedback--you are why we do what we do. Like many other content
              creators, however, we've realized that the comments section on our
              website was not providing a useful experience for most of our
              listeners. So, after much careful consideration, we've decided to
              close our comments section. Instead, we'd like to continue the
              conversation with you via
              <v-flexible-link to="https://twitter.com/radiolab"
                >Twitter</v-flexible-link
              >,
              <v-flexible-link to="https://www.facebook.com/Radiolab/"
                >Facebook</v-flexible-link
              >and, of course, through email at
              <v-flexible-link to="mailto:radiolab@wnyc.org"
                >radiolab@wnyc.org</v-flexible-link
              >.
            </p>
          </div>
        </div>
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
