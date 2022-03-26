<script setup>
/**
TODO: Eventually the left side will have to be Clickable to initiate the play service.. and only the right arrow will be to select from the menu
*/
import { ref, onUpdated } from "vue"

const props = defineProps({
  menuClass: {
    default: '',
    type: String,
  },
  episode: {
    default: {},
    type: Object,
  }
})

const playServices = usePlayServices()
const playServicePreference = usePlayServicePreference()

const selectedPlayService = ref(playServicePreference)

const launchService = (service) => {
  //updating local storage on update
  window.localStorage.setItem("selectedPlayService", JSON.stringify(service))

  //launch tab of service
  window.open(service.url, '_blank')
}

// This is where the magic happens. 
// TODO: trigger global player to consume episode and play
const launchEpisode = () => {
  if (props.episode.attributes) {
    //console.log('episode', props.episode.attributes)
  } else {
    //console.log('episode', props.episode)
  }
}

</script>

<template>
  <div class="play-selector flex justify-content-between">
    <Button class="listen-btn p-button-rounded" @click="launchEpisode">
      <span class="play-icon">
        <img src="/play-icon.svg" alt="play icon" />
      </span>
      <span class="p-button-label">Listen</span>
    </Button>
    <div>
      <Button
        :title="`Open ${playServicePreference.name}`"
        @click="launchService(playServicePreference)"
        class="service-btn p-button-rounded"
      >
        <img
          v-if="selectedPlayService"
          alt="icon"
          :src="'/play-service-icons/' + playServicePreference.icon + '.svg'"
        />
      </Button>
      <Dropdown
        title="Choose platform"
        v-model="selectedPlayService"
        :options="playServices"
        :panelClass="menuClass"
      >
        <template #option="slotProps">
          <div class="service-item">
            <img alt="icon" :src="'/play-service-icons/' + slotProps.option.icon + '.svg'" />
            <div>{{ slotProps.option.name }}</div>
            <div class="hack-click" @click="launchService(slotProps.option)"></div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.play-selector {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  flex-grow: 1;
  .service-btn {
    border-radius: 2rem 0 0 2rem;
  }
  .listen-btn {
    padding-left: 0.5rem;
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
    margin-right: 6px;
    line-height: 0;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
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
    .hack-click {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: transparent;
      left: 0;
    }
  }
}
</style>
