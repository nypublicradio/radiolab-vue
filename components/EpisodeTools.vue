<script setup>
import {
  copyToClipBoard,
  shareAPI,
  toastGlobalConfig,
} from '~/utilities/helpers'
import PlaySelector from '~/components/PlaySelector.vue'
import { createToast } from 'mosha-vue-toastify'
import { ShareNetwork } from 'vue-social-sharing'

const props = defineProps({
  episode: {
    type: Object,
    default: null,
  },
  isTranscript: {
    type: Boolean,
    default: false,
  },
})

const toastConfig = ref(toastGlobalConfig())
const dotsMenu = ref()
const shareMenu = ref()
const dotsItems = ref([
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: () => {
      window.open(props.episode.audio, '_blank')
      createToast(
        {
          title: 'Download started...',
        },
        toastConfig.value
      )
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Tools',
        event_label: 'Download',
      })
    },
  },
  {
    label: 'Embed',
    icon: 'pi pi-code',
    command: () => {
      copyToClipBoard(props.episode.embedCode, 'Embed code copied to clipboard')
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Tools',
        event_label: 'Embed',
      })
    },
  },
])

const shareItems = ref([
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      const twitterShare = document.getElementsByClassName('twitterShareRef')
      twitterShare[0].click()
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Share Tools',
        event_label: 'Twitter',
      })
    },
  },
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      const facebookShare = document.getElementsByClassName('facebookShareRef')
      facebookShare[0].click()
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Share Tools',
        event_label: 'Facebook',
      })
    },
  },
  {
    label: 'Email',
    icon: 'pi pi-envelope',
    command: () => {
      const emailShare = document.getElementsByClassName('emailShareRef')
      emailShare[0].click()
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Share Tools',
        event_label: 'Email',
      })
    },
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      shareAPI(
        {
          url: `${props.episode.url}${props.isTranscript ? 'transcript' : ''}`,
        },
        'Episode link copied to the clipboard'
      )
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: 'Episode Share Tools',
        event_label: 'Copy link',
      })
    },
  },
])

// toggle function for dot menu
const toggleDots = (event) => {
  dotsMenu.value.toggle(event)
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: 'Episode Tools',
    event_label: 'Dots Menu',
  })
}
// toggle function for dot menu
const toggleShare = (event) => {
  shareMenu.value.toggle(event)
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking',
    component: 'Episode Tools',
    event_label: 'Share Menu',
  })
}
</script>

<template>
  <div>
    <div class="episode-tools-holder flex flex-wrap lg:flex-nowrap">
      <client-only>
        <play-selector
          :episode="episode"
          menu-class="episode-tools-play-selector"
        />
      </client-only>
      <nuxt-link
        v-if="!!props.episode['transcript'] && !props.isTranscript"
        :to="`/podcast/${episode?.slug}/transcript`"
        class="p-button p-component p-button-sm p-button-rounded no-underline"
      >
        Transcript
      </nuxt-link>
      <Button
        icon="pi pi-share-alt"
        class="p-button-rounded p-button-sm wh40"
        @click="toggleShare"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        aria-label="share"
      />
      <Menu
        ref="shareMenu"
        :model="shareItems"
        :popup="true"
        class="episode-tools-menu"
      />
      <Button
        icon="pi pi-ellipsis-v"
        class="p-button-rounded wh40"
        @click="toggleDots"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        aria-label="options"
      />
      <Menu
        ref="dotsMenu"
        :model="dotsItems"
        :popup="true"
        class="episode-tools-menu"
      />

      <div class="hidden">
        <ShareNetwork
          class="facebookShareRef"
          network="facebook"
          :url="`${episode.url}${isTranscript ? 'transcript' : ''}`"
          :title="episode.title"
          :description="episode.tease"
          :quote="episode.tease.replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="episode.tags.join()"
        >
          Share on Facebook
        </ShareNetwork>
        <ShareNetwork
          class="twitterShareRef"
          network="twitter"
          :url="`${episode.url}${isTranscript ? 'transcript' : ''}`"
          :title="episode.title"
          :description="episode.tease"
          :quote="episode.tease.replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="episode.tags.join()"
          twitter-user="Radiolab"
        >
          Share on Twitter
        </ShareNetwork>
        <ShareNetwork
          class="emailShareRef"
          network="email"
          :url="`${episode.url}${isTranscript ? 'transcript' : ''}`"
          :title="episode.title"
          :description="episode.tease"
          :quote="episode.tease.replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="episode.tags.join()"
        >
          Share on Email
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.episode-tools-holder {
  gap: 12px 6px;
  width: 100%;
  .play-selector {
    margin-left: 0;
    margin-right: 0;
    justify-content: flex-start !important;
    gap: 6px;
    margin-left: 0;
    flex-grow: 0;
    @include media('<#{$toolsBreakPoint}') {
      width: 100%;
      .p-button {
        flex-grow: 1;
      }
    }
    .listen-btn {
      @include black-button();
    }
    .service-btn {
      /* border-radius: 2rem 0 0 2rem; */
    }
    .p-dropdown {
      /*       justify-content: flex-end;
      width: 40px; */
      background-color: var(--primary-color);
      padding-right: 10px;
      /* border-radius: 0 2rem 2rem 0; */
    }
  }
  .wh40 {
    width: 40px;
    height: 40px;
  }
}
.p-dropdown-panel.episode-tools-play-selector {
  margin-top: spacing(3);
  .p-dropdown-items-wrapper {
    padding: 0.5rem;
    background-color: var(--primary-color);
    .p-dropdown-item {
      border-radius: 2rem;
      &:hover {
        background: var(--white) !important;
      }
    }
  }
}
.episode-tools-menu.episode-tools-menu {
  margin-top: spacing(3);
  box-shadow: none;
  background-color: var(--primary-color);
  padding: 0.5rem;
  .p-menuitem-link {
    border-radius: 2rem;
    .p-menuitem-icon {
      color: var(--black100);
    }
    &:hover {
      .p-menuitem-icon {
        color: var(--black100);
      }
    }
  }
}
</style>
