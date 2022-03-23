<script setup>
/**
TODO: Eventually the left side will have to be Clickable to initiate the play service.. and only the right arrow will be to select from the menu
*/
import { ref, onUpdated } from "vue"

const props = defineProps({
  label: {
    default: false,
    type: Boolean,
  },
  menuClass: {
    default: '',
    type: String,
  }
})

const playServices = usePlayServices()
const playServicePreference = usePlayServicePreference()

const selectedPlayService = ref(playServicePreference)

const launchService = (service) => {
  console.log('service: ', service)
}

console.log('playServicePreference: ', playServicePreference)
//const emit = defineEmit(["change", "click"]);

// lifecycle hooks
onUpdated(() => {
  window.localStorage.setItem("selectedPlayService", JSON.stringify(selectedPlayService.value))
})
</script>

<template>
  <div class="play-selector flex justify-content-between">
    <Button class="listen-btn p-button-rounded">
      <span class="play-icon"></span>Listen
    </Button>
    <div>
      <Button @click="launchService(playServicePreference)" class="service-btn p-button-rounded">
        <img alt="icon" :src="'/play-service-icons/' + playServicePreference.icon + '.svg'" />
      </Button>
      <Dropdown v-model="selectedPlayService" :options="playServices" :panelClass="menuClass">
        <template #value="slotProps">
          <div class="service-item service-item-value" v-if="slotProps.value">
            <!-- <img alt="icon" :src="'/play-service-icons/' + slotProps.value.icon + '.svg'" />
            <div v-if="label" class="uppercase">{{ slotProps.value.name }}</div>-->
          </div>
          <span v-else>{{ slotProps.placeholder }}</span>
        </template>
        <template #option="slotProps">
          <div class="service-item">
            <img alt="icon" :src="'/play-service-icons/' + slotProps.option.icon + '.svg'" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.play-selector {
  margin-left: -1rem;
  margin-right: -0.5rem;
  flex-grow: 1;
  .service-btn {
    border-radius: 2rem 0 0 2rem;
  }
  .p-dropdown {
    justify-content: flex-end;
    height: 40px;
    width: 40px;
    padding-right: 10px;
    background: transparent;
    border: none;
    border-radius: 0 2rem 2rem 0;
    &:hover {
      background-color: var(--black100) !important;
    }
    .p-dropdown-label {
      border-radius: 0;
      padding: 5px;
      display: none;
    }
    .p-dropdown-trigger {
      color: var(--black100);
      background: var(--white);
      border-radius: 2rem;
      width: 20px;
      height: 20px;
      display: flex;
      align-self: center;
      .p-dropdown-trigger-icon {
        font-size: 11px;
      }
    }
  }
  .play-icon {
    background-color: var(--black100);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    &:after {
      content: "";
      border-color: transparent transparent transparent #fff;
      border-style: solid;
      border-width: 6px 0 6px 8px;
      box-sizing: border-box;
      top: 12px;
      left: 23px;
      margin: auto;
      position: absolute;
    }
  }
  .service-btn {
    width: 40px;
    height: 40px;
    padding: 8px;
  }
}
.p-dropdown-panel {
  box-shadow: var(--shadow);
}
.p-dropdown-panel,
.p-dropdown-label {
  align-self: center;
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
