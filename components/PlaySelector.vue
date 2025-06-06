<script setup>
import { ref, computed } from 'vue'
import {
  useCurrentEpisode,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  usePlayServicePreference,
} from '~/composables/states'
import {
  playServices,
  playServicesKids,
  lsSelectedPlayService,
} from '~/utilities/constants'
const { $analytics } = useNuxtApp()
const props = defineProps({
  menuClass: {
    default: '',
    type: String,
  },
  episode: {
    default: {},
    type: Object,
  },
  kids: {
    type: Boolean,
    default: false,
  },
  bucket: {
    type: Boolean,
    default: false,
  },
})

const playServicePreference = usePlayServicePreference()
const selectedPlayService = ref(playServicePreference)

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()

const currentEpisode = useCurrentEpisode()

const launchService = (service) => {
  //updating local storage on update
  window.localStorage.setItem(lsSelectedPlayService, JSON.stringify(service))

  //launch tab of service
  window.open(service.url, '_blank')

  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: `Launch Audio Service: ${service.name}`,
    event_label: props.bucket
      ? props.episode.attributes.title
      : props.episode.title,
  })
}

// computed property for the currentEpisode slug
const currentEpisodeSlug = computed(() => {
  return (
    currentEpisode.value?.meta?.slug ||
    currentEpisode.value?.attributes?.slug ||
    currentEpisode.value?.slug
  )
})

// computed property for the props.episode slug
const propEpisodesSlug = computed(() => {
  return (
    props.episode?.meta?.slug ||
    props.episode?.attributes?.slug ||
    props.episode?.slug
  )
})

// This is where the magic happens.
// if this instances props.episode.slug matches the currentEpisode.value.slug, this method now handles the play toggle and the setting of 2 global vars that control the persistent player and the display of the listen/play/pause button
const launchEpisode = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: 'Launch Audio Player',
    event_label: props.bucket
      ? props.episode.attributes.title
      : props.episode.title,
  })
  if (
    currentEpisode.value &&
    currentEpisodeSlug.value === propEpisodesSlug.value
  ) {
    // toggle global isEpisodePlaying state
    isEpisodePlaying.value = !isEpisodePlaying.value
    // toggle global togglePlayTrigger state to trigger the playToggle method in the persistent player
    togglePlayTrigger.value = !togglePlayTrigger.value
  } else {
    // if the currentEpisode.value.slug does not match the props.episode.slug, this means the user has selected a new episode.
    currentEpisode.value = props.episode
  }
}

const checkEpisodeMatchAndPlaying = computed(() => {
  if (currentEpisode.value) {
    if (
      currentEpisodeSlug.value === propEpisodesSlug.value &&
      isEpisodePlaying.value
    ) {
      return true
    }
  }
  return false
})

const checkEpisodeMatch = computed(() => {
  if (currentEpisode.value) {
    if (currentEpisodeSlug.value === propEpisodesSlug.value) {
      return true
    }
  }
  return false
})
</script>

<template>
  <div class="play-selector flex justify-content-between">
    <Button
      @click="launchEpisode"
      class="listen-btn p-button-rounded"
      :class="[
        { active: checkEpisodeMatch },
        { anim: checkEpisodeMatchAndPlaying },
      ]"
      :aria-label="checkEpisodeMatch ? 'Play' : 'Listen'"
    >
      <span class="play-icon">
        <img
          v-if="checkEpisodeMatchAndPlaying"
          src="/pause-icon.svg"
          alt="play/pause icon"
        />
        <img v-else src="/play-icon.svg" alt="play/pause icon" />
      </span>
      <span v-if="!checkEpisodeMatchAndPlaying" class="p-button-label">{{
        checkEpisodeMatch ? 'Play' : 'Listen'
      }}</span>
    </Button>
    <div>
      <Button
        :title="`Open ${playServicePreference.name}`"
        @click="launchService(playServicePreference)"
        class="service-btn p-button-rounded inline-block"
        :aria-label="`Listen to this episode on ${playServicePreference.name}`"
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
        :options="kids ? playServicesKids : playServices"
        :panel-class="menuClass"
        option-label="name"
        aria-label="Select a service to play this episode"
        aria-labelledby="Select a service to play this episode"
      >
        <template #option="slotProps">
          <div class="service-item">
            <img
              alt="icon"
              :src="'/play-service-icons/' + slotProps.option.icon + '.svg'"
            />
            <div>{{ slotProps.option.name }}</div>
            <div class="hack-click" @click="launchService(slotProps.option)" />
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
    padding-right: 0.6rem;
    &.active {
      background-color: var(--blue-500) !important;
      .p-button-label {
        color: var(--white) !important;
      }
    }
    &.anim {
      &:before {
        content: '';
        background-image: url('/audioAnim.gif') !important;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 110%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.3;
        max-width: 30px;
      }
    }
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
    line-height: 0;
    z-index: 1;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  .p-button-label {
    margin-left: 6px;
    padding-right: 0.6rem;
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
