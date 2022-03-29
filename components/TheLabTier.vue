<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  cost: {
    type: String,
    default: null,
  },
  joinLink: {
    type: String,
    default: "https://members.radiolab.org/",
  },
})

//const emit = defineEmit(["change", "click"]);


</script>

<template>
  <div class="the-lab-tier">
    <img class="icon" :src="props.icon" alt="viper icon" />
    <h3>{{ props.name }}</h3>
    <h2 class="cost mt-2">
      <sup>$</sup>
      {{ props.cost }}
    </h2>
    <p>a month or ${{ Number(props.cost) * 12 }} annually</p>
    <v-flexible-link :to="props.joinLink">JOIN NOW</v-flexible-link>
  </div>
</template>

<style lang="scss">
.the-lab-tier {
  text-align: center;
  .cost sup {
    font-size: 24px;
    margin-left: -13px;
  }
  .flexible-link {
    display: block;
    margin-top: spacing(4);
    color: var(--blue-500);
  }
}
</style>
