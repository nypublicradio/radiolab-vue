<script setup>
/**
TODO: Eventually the left side will have to be Clickable to initiate the play service.. and only the right arrow will be to select from the menu
*/
import { ref, onUpdated } from "vue"

const props = defineProps({
  label: {
    default: true,
    type: Boolean,
  }
})

const playServices = usePlayServices()
const playServicePreference = usePlayServicePreference()

const selectedPlayService = ref(playServicePreference)

//const emit = defineEmit(["change", "click"]);

// lifecycle hooks
onUpdated(() => {
  window.localStorage.setItem("selectedPlayService", JSON.stringify(selectedPlayService.value))
})
</script>

<template>
  <div class="play-selector">
    <Dropdown v-model="selectedPlayService" :options="playServices" placeholder="Select a Service">
      <template #value="slotProps">
        <div class="service-item service-item-value" v-if="slotProps.value">
          <img alt="icon" :src="'play-service-icons/' + slotProps.value.icon + '.svg'" />
          <div v-if="label" class="uppercase">{{ slotProps.value.name }}</div>
        </div>
        <span v-else>{{ slotProps.placeholder }}</span>
      </template>
      <template #option="slotProps">
        <div class="service-item">
          <img alt="icon" :src="'play-service-icons/' + slotProps.option.icon + '.svg'" />
          <div v-if="label">{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.play-selector {
  margin-left: -1rem;
  width: calc(100% + 2rem);
  .p-dropdown {
    width: 100%;
    background: transparent;
    border: none;
    .p-dropdown-label {
      padding-left: 1rem;
      border-radius: 0;
    }
    .p-dropdown-trigger {
      color: var(--black100);
      background: var(--white);
      border-radius: 2rem;
      margin-right: 1rem;
      width: 20px;
      height: 20px;
      display: flex;
      align-self: center;
      .p-dropdown-trigger-icon {
        font-size: 11px;
      }
    }
  }
}
.p-dropdown-panel{
  box-shadow: var(--shadow);
}
.p-dropdown-panel,
.p-dropdown-label {
  border-radius: 0 0 20px 20px;
  .service-item {
    display: flex;
    width: 100%;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: spacing(2);
      vertical-align: middle;
      margin-top: -2px;
    }
  }
}
</style>
