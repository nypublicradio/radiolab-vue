<script setup>
import { ref, watchEffect } from 'vue'
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import { useCurrentEpisode } from '~/composables/states'
import { toastGlobalConfig } from '~/utilities/helpers'
import { createToast } from 'mosha-vue-toastify'
// had to install howler.js locally and add this import to stop it from breaking the build
import { Howl, Howler } from 'howler'
const currentEpisode = useCurrentEpisode()

const toastConfig = ref(toastGlobalConfig())

/*function called from the emit of the persistent player when the download button is clicked to trigger the toast notification*/
const onDownload = () => {
  createToast({ title: 'Downloading episode audio file', description: 'Check your system\'s downloads folder' }, toastConfig.value)
}


let showPlayer = ref(false)
const firstFlag = ref(false)
// function that handles the logic for the persistent player to show and hide when the user changes the episode
const switchEpisode = () => {
  if (firstFlag.value) {
    showPlayer.value = false
    setTimeout(() => {
      showPlayer.value = true
    }, 1000)
  } else {
    showPlayer.value = true
  }
  firstFlag.value = true
}

watchEffect(() => {
  if (currentEpisode.value) {
    switchEpisode()
  }
})

</script>

<template>
  <transition name="player">
    <v-persistent-player
      v-if="showPlayer"
      :auto-play="true"
      :is-playing="true"
      :title="currentEpisode.title"
      :title-link="currentEpisode.slug"
      :station="currentEpisode['show-title']"
      :description="currentEpisode.tease"
      :image="currentEpisode['image-main'].template.replace('%s/%s/%s/%s', '%width%/%height%/c/%quality%')"
      :file="currentEpisode.audio"
      :duration-seconds="currentEpisode['estimated-duration']"
      :show-download="currentEpisode['audio-may-download'] ? true : false"
      :show-skip="true"
      :can-minimize="true"
      @download="onDownload"
    />
  </transition>
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
