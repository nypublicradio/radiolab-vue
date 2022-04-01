<script setup>
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import { useCurrentEpisode } from '~/composables/states'
const currentEpisode = useCurrentEpisode()

const togglePlayFunc = () => {
    console.log('toggle play')
}

</script>

<template>
    <transition name="player">
        <v-persistent-player
            v-if="!!currentEpisode"
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
            :show-skip="false"
            @togglePlay="togglePlayFunc"
        />
    </transition>
</template>

<style lang="scss">
.persistent-player {
    border-top: 1px solid var(--blue-300);
    position: sticky;
    background-color: var(--blue-500);
    .play-button {
        background-color: transparent;
        border: 1px solid var(--white);
    }
    * {
        color: var(--white);
    }
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
    transform: translateY(100px);
}
</style>
