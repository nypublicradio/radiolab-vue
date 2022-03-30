<script setup>
import { tiers } from '~/utilities/membershipsData.js'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
</script>

<template>
  <div class="the-lab-memberships">
    <div class="desktop hidden md:block">
      <div class="grid mb-3">
        <div class="col-3"></div>
        <div v-for="(tier, index) in tiers" class="col-3">
          <the-lab-tier
            :icon="tier.icon"
            :name="tier.name"
            :cost="tier.cost"
            :style="`margin-top:${index === 1 ? '-23' : 0}px;`"
          />
        </div>
      </div>
      <the-lab-options />
    </div>
    <div class="mobile md:hidden">mobile membership experience to come</div>
    <div class="grid mt-4">
      <div class="col-3"></div>
      <div class="col-9 text-center">
        <p>On occasion we may adjust benefits based on member feedback or other factors. We'll always give you a heads-up when a change is coming.</p>
        <p class="mt-4">
          Already a member?
          <v-flexible-link to="https://members.radiolab.org/request_access">Log in</v-flexible-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
