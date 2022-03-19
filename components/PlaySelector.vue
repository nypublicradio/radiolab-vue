<script setup>
import { ref, onMounted } from "vue"

const selectedPlayService = ref()
const playServices = ref([
  { name: 'Play on our site', icon: 'site' },
  { name: 'Apple', icon: 'apple' },
  { name: 'Spotify', icon: 'spotify' },
  { name: 'Overcast', icon: 'overcast' },
  { name: 'Stitcher', icon: 'stitcher' },
  { name: 'NPR One', icon: 'nprone' },
  { name: 'Google', icon: 'google' },
  { name: 'Castbox', icon: 'castbox' },
  { name: 'Amazon', icon: 'amazon' },
  { name: 'Pocket Cast', icon: 'pocket' },
  { name: 'Podcast Addict', icon: 'podcastaddict' },
  { name: 'RSS', icon: 'rss' }
])
//const emit = defineEmit(["change", "click"]);

// lifecycle hooks
onMounted(() => {

})
</script>

<template>
  <div class="play-selector">
    <Dropdown
      v-model="selectedPlayService"
      :options="playServices"
      class="dd"
      optionLabel="name"
      optionValue="code"
      placeholder="Select a City"
    />
    <Dropdown
      v-model="selectedPlayService"
      :options="playServices"
      class="dd"
      optionLabel="brand"
      placeholder="Select a Car"
    >
      <template #option="slotProps">
        <div class="p-dropdown-car-option">
          <img
            :alt="slotProps.option.icon"
            :src="'demo/images/car/' + slotProps.option.icon + '.svg'"
          />
          <span>{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.play-selector {
  width: 100%;
  .dd {
    width: 100%;
  }
}
</style>
