<script setup>
import { computed } from 'vue'
import { tiers, options } from '~/utilities/membershipsData.js'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  tiers: {
    type: Array,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
})

// remove Merch and Swag with hideLabels 
const labelsToHideArray = ['Merch', 'Swag']
const hideLabels = (label) => {
  if (labelsToHideArray.includes(label)) {
    return false
  } else {
    return true
  }
}

</script>

<template>
  <div
    v-if="props.options"
    class="grid the-lab-options-mobile mb-2 align-items-center"
    v-for="(option, index) in props.options"
  >
    <div class="base col col-12" :key="index">
      <div
        :class="[{ 'box': option.tiers[props.index].check || (option.tiers[props.index].text && !option.tiers[props.index].image) }, { 'check': option.tiers[props.index].check }, { 'has-image': option.tiers[props.index].image }]"
      >
        <span v-if="hideLabels(option.label)" class="label">{{ option.label }}</span>
        <img
          v-if="option.tiers[props.index].image"
          class="image"
          :src="option.tiers[props.index].image"
          alt="Merch Image"
        />
        <p v-if="option.tiers[props.index].text" class="text">{{ option.tiers[props.index].text }}</p>
        <v-flexible-link
          class="block"
          v-if="option.tiers[props.index].buttonText"
          :to="option.tiers[props.index].buttonLink"
          raw
        >
          <Button class="blue p-button-lg" :label="option.tiers[props.index].buttonText" />
        </v-flexible-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.the-lab-options-mobile {
  padding: 0 0.5rem;
  .base {
    text-align: left;

    padding: 0.25rem;
    .box {
      background-color: var(--primary-color);
      border-radius: 4px;
      text-align: left;
      padding: 0.4rem 0.5rem;
      .label {
        padding-left: 0;
        text-decoration: none;
        color: var(--text-color);
        line-height: normal;
      }
      &.check {
        &:before {
          margin-right: 0.5rem;
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
    .label {
      text-align: right;
      margin-top: -6px;
      padding-left: 2.1rem;
      text-decoration: line-through;
      color: var(--primary-dark-color);
      line-height: 30px;
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
      padding: 5px 40px 0;
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
