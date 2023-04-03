<script setup>
import { ref, watch, computed } from 'vue'
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
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const toastConfig = ref( toastGlobalConfig() )
const showPlayer = ref( false )
const playerRef = ref()

/*function called from the emit of the persistent player when the download button is clicked to trigger the toast notification*/
const onDownload = () => {
  createToast(
    {
      title: 'Download started...',
    },
    toastConfig.value
  )
  gaEvent( 'Click Tracking', 'Audio Player', 'Download' )
}

/*function that updated the global useIsEpisodePlaying */
const updateUseIsEpisodePlaying = ( e ) => {
  isEpisodePlaying.value = e
}

let delay = 0
// function that handles the logic for the persistent player to show and hide when the user changes the episode
const switchEpisode = () => {
  showPlayer.value = false
  setTimeout( () => {
    showPlayer.value = true
    delay = 1000
  }, delay )
}

watch( currentEpisode, () => {
  switchEpisode()
} )

watch( togglePlayTrigger, () => {
  playerRef.value.togglePlay()
} )
</script>

<template>
  <div>
    <transition name="player">
      <v-persistent-player
        ref="playerRef"
        v-if="showPlayer"
        :auto-play="true"
        :title="currentEpisode.title"
        :title-link="`/podcast/${currentEpisode.slug}`"
        :station="currentEpisode['show-title']"
        :description="currentEpisode.tease"
        :image="formatPublisherImageUrl(currentEpisode['image-main'].template)"
        :file="currentEpisode.audio"
        :duration-seconds="currentEpisode['estimated-duration']"
        :show-download="currentEpisode['audio-may-download'] ? true : false"
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
