<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

</script>

<template>
  <div class="membership-promo">
    <img class="mb-1" alt="THE LAB sticker" src="/the-lab-sticker-black.svg" />
    <h4 class="mb-4">Unlock member-only exclusives and support the show</h4>
    <h5>Exclusive Podcast Extras</h5>
    <h5>Entire Podcast Archive</h5>
    <h5>Listen Ad-Free</h5>
    <h5>Behind-the-Scenes Content</h5>
    <h5>Video Extras</h5>
    <h5>Original Music & Playlists</h5>
    <v-flexible-link raw to="/become-a-member">
      <Button class="p-button-rounded black mt-4">Become a member</Button>
    </v-flexible-link>
  </div>
</template>

<style lang="scss">
.membership-promo {
  background-color: var(--primary-color);
  border-radius: 20px;
  padding: 40px;
  img {
    width: 100px;
    height: auto;
  }
  h5 {
    margin-bottom: 0.4rem;
    font-size: var(--font-size-2);
  }
}
</style>
