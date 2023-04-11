<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const { $analytics } = useNuxtApp()
</script>

<template>
  <div class="become-a-member">
    <div class="grid">
      <div :class="`col-12 left md:pr-8`">
        <h2>
          Unlock exclusives
          <span class="white-space-nowrap">
            in
            <v-flexible-link raw rawHover="underline" to="/the-lab"
              >The Lab</v-flexible-link
            >
            <span>
              <img
                alt="icon"
                src="/rl-icon-stripes.svg"
                class="icon ml-2 pb-2"
              />
            </span>
          </span>
        </h2>
      </div>
      <div :class="`col-12 right mt-4`">
        <v-flexible-link to="/the-lab" raw class="mt-4">
          <Button
            class="p-button-lg p-button-rounded"
            label="Become a member"
            aria-label="Become a member"
            @click="gaEvent('Click Tracking', 'Footer', 'Become a member')"
          />
        </v-flexible-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.become-a-member {
  .left {
    .icon {
      width: 45px;
      height: auto;
      vertical-align: middle;
    }
  }
  .right {
  }
}
</style>
