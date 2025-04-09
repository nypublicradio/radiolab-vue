<script setup>
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import {
  useCurrentEpisode,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
} from '~/composables/states'
import { toastGlobalConfig, formatPublisherImageUrl } from '~/utilities/helpers'
import { createToast } from 'mosha-vue-toastify'
// had to install howler.js locally and add this import to stop it from breaking the build
import { Howl, Howler } from 'howler'
const { $analytics } = useNuxtApp()
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const toastConfig = ref(toastGlobalConfig())
const showPlayer = ref(false)
const playerRef = ref()

/*function called from the emit of the persistent player when the download button is clicked to trigger the toast notification*/
const onDownload = () => {
  createToast(
    {
      title: 'Download started...',
    },
    toastConfig.value
  )
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'Audio Player',
    event_label: 'Download',
  })
}

/*function that updated the global useIsEpisodePlaying */
const updateUseIsEpisodePlaying = (e) => {
  isEpisodePlaying.value = e
}

let delay = 0
// function that handles the logic for the persistent player to show and hide when the user changes the episode
const switchEpisode = () => {
  showPlayer.value = false
  setTimeout(() => {
    showPlayer.value = true
    delay = 1000
  }, delay)
}

// computed property for the episode title
const episodeTitle = computed(() => {
  return currentEpisode.value?.title || currentEpisode.value.attributes.title
})

// computed property for the episode slug
const episodeSlug = computed(() => {
  return (
    currentEpisode.value?.meta?.slug || currentEpisode.value.attributes.slug
  )
})

// computed property for the episode station
const episodeImage = computed(() => {
  return (
    currentEpisode.value?.['showTitle'] ||
    currentEpisode.value.attributes['showTitle']
  )
})

// computed property for the episode description
const episodeDescription = computed(() => {
  return currentEpisode.value?.tease || currentEpisode.value.attributes.tease
})

// computed property for the episode image template
const episodeImageTemplate = computed(() => {
  return (
    currentEpisode.value?.image?.template ||
    currentEpisode.value.attributes.imageMain.template
  )
})

// computed property for the episode audio file
const episodeAudio = computed(() => {
  return currentEpisode.value?.audio || currentEpisode.value.attributes.audio
})

// computed property for the episode estimated duration
const episodeEstimatedDuration = computed(() => {
  return (
    currentEpisode.value?.estimatedDuration ||
    currentEpisode.value.attributes.estimatedDuration
  )
})

watch(currentEpisode, () => {
  switchEpisode()
})

watch(togglePlayTrigger, () => {
  playerRef.value.togglePlay()
})
</script>

<template>
  <div>
    <transition name="player">
      <v-persistent-player
        ref="playerRef"
        v-if="showPlayer"
        :auto-play="true"
        :title="episodeTitle"
        :title-link="`/podcast/${episodeSlug}`"
        :station="episodeTitle"
        :description="episodeDescription"
        :image="formatPublisherImageUrl(episodeImageTemplate)"
        :file="episodeAudio"
        :duration-seconds="episodeEstimatedDuration"
        :show-download="true"
        :show-skip="true"
        :can-minimize="true"
        @download="onDownload"
        @togglePlay="updateUseIsEpisodePlaying"
      />
    </transition>
  </div>
</template>

<style lang="scss">
.persistent-player {
  border-top: 1px solid var(--blue-300);
  position: fixed;
  background-color: var(--blue-500);

  .play-button {
    background-color: transparent;
    border: 1px solid var(--white);
  }

  * {
    color: var(--white) !important;
  }

  .flexible-link {
    &:hover {
      color: var(--white) !important;
    }
  }

  .p-slider-range {
    background: var(--orange-400);
  }

  .maximize-btn-holder .maximize-btn.p-button {
    background-color: var(--blue-500);
    border: 1px solid var(--blue-300);

    &:hover {
      background-color: var(--blue-600);
    }
  }

  /*   &.at-bottom {

    .maximize-btn-holder,
    .minimize-btn {
      display: none;
    }
  } */
}

// slide in from bottom to top
.player-enter-active {
  transition: transform calc(var(--transition-duration) * 2) ease-out;
}

.player-leave-active {
  transition: transform calc(var(--transition-duration) * 2) ease-in;
}

.player-enter-from,
.player-leave-to {
  transform: translateY(var(--player-height));
}
</style>
