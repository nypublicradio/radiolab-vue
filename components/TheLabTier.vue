<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  cost: {
    type: String,
    default: '',
  },
  joinLink: {
    type: String,
    default: 'https://members.radiolab.org',
  },
})
</script>

<template>
  <div class="the-lab-tier">
    <img v-if="props.icon" class="icon" :src="props.icon" alt="icon" />
    <h3>{{ props.name }}</h3>
    <h2 class="cost mt-2">
      <sup>$</sup>
      <span class="text-6xl">{{ props.cost }}</span>
    </h2>
    <p class="blurb">
      a month or
      <br />
      ${{ Number(props.cost) * 12 }} annually
    </p>
    <v-flexible-link :to="props.joinLink">JOIN NOW</v-flexible-link>
  </div>
</template>

<style lang="scss">
.the-lab-tier {
  text-align: center;
  .cost {
    font-weight: var(--font-weight-400);
    span {
      margin-left: 0px;
    }
    sup {
      font-size: 24px;
    }
  }
  .blurb {
    line-height: normal;
  }
  .flexible-link {
    display: block;
    margin-top: spacing(4);
    color: var(--blue-500);
  }
}
</style>
