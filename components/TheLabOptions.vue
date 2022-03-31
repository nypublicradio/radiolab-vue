<script setup>
import { ref } from 'vue'
import { tiers, options } from '~/utilities/membershipsData.js'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const theTiers = ref(null)
const theOptions = ref(null)

onMounted(() => {
  theTiers.value = tiers
  theOptions.value = options
})
</script>

<template>
  <div>
    <div v-if="theOptions">
      <div
        class="grid the-lab-options mb-2 align-items-center"
        v-for="(option, index) in theOptions"
        :key="`${option.label}-${index}`"
      >
        <div class="col-3">
          <div v-if="option.label" class="label">{{ option.label }}</div>
        </div>
        <div class="col-3" v-for="(tier, index) in theTiers" :key="`${tier.name}-${index}`">
          <div
            :class="[{ 'box': option.tiers[index].check || (option.tiers[index].text && !option.tiers[index].image) }, { 'check': option.tiers[index].check }, { 'has-image': option.tiers[index].image }]"
          >
            <img
              v-if="option.tiers[index].image"
              class="image"
              :src="option.tiers[index].image"
              alt="Merch Image"
            />
            <p v-if="option.tiers[index].text" class="text">{{ option.tiers[index].text }}</p>
            <v-flexible-link
              v-if="option.tiers[index].buttonText"
              :to="option.tiers[index].buttonLink"
              raw
            >
              <Button class="blue p-button-lg" :label="option.tiers[index].buttonText" />
            </v-flexible-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.the-lab-options {
  .col-3 {
    .label {
      text-align: right;
      margin-top: -6px;
    }
    padding: 0.25rem;
    .box {
      background-color: var(--primary-color);
      border-radius: 4px;
      text-align: center;
      padding: 0.4rem 0.5rem;
      &.check {
        &:after {
          content: "\e909";
          text-align: center;
          font-weight: bold;
          speak: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          display: inline-block;
          font-family: "primeicons";
          font-style: normal;
          font-variant: normal;
          font-weight: 400;
          line-height: 1;
          text-transform: none;
        }
      }
    }
    .has-image {
      border: 1px solid var(--primary-color);
    }
    .text {
      text-align: center;
      padding: 1rem 0.5rem;
    }
    .image {
      height: auto;
      padding: 20px 20px 0;
      width: 100%;
      margin: 0 auto;
      display: block;
    }
    .flexible-link .p-button {
      width: 100%;
      border-radius: 2px;
    }
  }
}
</style>
