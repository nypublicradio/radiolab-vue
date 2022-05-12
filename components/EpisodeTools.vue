<script setup>
import gaEvent from '../utilities/ga.js'
import { ref } from 'vue'
import {
  copyToClipBoard,
  shareAPI,
  toastGlobalConfig,
} from '~/utilities/helpers'
import PlaySelector from '~/components/PlaySelector.vue'
import { createToast } from 'mosha-vue-toastify'
import { ShareNetwork } from 'vue-social-sharing'
// import { emit } from 'process'

const props = defineProps({
  episode: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['toggleTranscript'])

const toastConfig = ref(toastGlobalConfig())
//const toastConfigDanger = ref(toastGlobalConfig({ type: 'danger' }))

const dotsMenu = ref()
const shareMenu = ref()
const dotsItems = ref([
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: () => {
      window.open(props.episode['audio'], '_top')
      createToast(
        {
          title: 'Downloading episode audio file',
          description: "Check your system's downloads folder",
        },
        toastConfig.value
      )
      gaEvent('Click Tracking', 'Episode Tools', 'Download')
    },
  },
  {
    label: 'Embed',
    icon: 'pi pi-code',
    command: () => {
      copyToClipBoard(
        props.episode['embed-code'],
        'Embed code copied to clipboard'
      )
      gaEvent('Click Tracking', 'Episode Tools', 'Embed')
    },
  },
])

const shareItems = ref([
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      var twitterShare = document.getElementsByClassName('twitterShareRef')
      twitterShare[0].click()
      gaEvent('Click Tracking', 'Episode Share Tools', 'Twitter')
    },
  },
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      var facebookShare = document.getElementsByClassName('facebookShareRef')
      facebookShare[0].click()
      gaEvent('Click Tracking', 'Episode Share Tools', 'Facebook')
    },
  },
  {
    label: 'Email',
    icon: 'pi pi-envelope',
    command: () => {
      var emailShare = document.getElementsByClassName('emailShareRef')
      emailShare[0].click()
      gaEvent('Click Tracking', 'Episode Share Tools', 'Email')
    },
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      shareAPI(
        {
          title: props.episode['title'],
          text: props.episode['tease'],
          url: props.episode['url'],
        },
        'Episode link copied to the clipboard'
      )
      gaEvent('Click Tracking', 'Episode Share Tools', 'Copy link')
    },
  },
])

// toggle function for dot menu
const toggleDots = (event) => {
  dotsMenu.value.toggle(event)
  gaEvent('Click Tracking', 'Episode Tools', 'Dots Menu')
}
// toggle function for dot menu
const toggleShare = (event) => {
  shareMenu.value.toggle(event)
  gaEvent('Click Tracking', 'Episode Tools', 'Share Menu')
}

// toggle function for toggle transcript emit
const toggleTranscript = () => {
  emit('toggleTranscript')
  gaEvent('Click Tracking', 'Episode Tools', 'Transcript')
}
</script>

<template>
  <div>
    <div class="episode-tools-holder flex flex-wrap lg:flex-nowrap">
      <play-selector
        :episode="props.episode"
        menu-class="episode-tools-play-selector"
      />
      <Button
        v-if="!!props.episode['transcript']"
        class="p-button-sm p-button-rounded"
        label="Transcript"
        @click="toggleTranscript"
      ></Button>
      <Button
        icon="pi pi-share-alt"
        class="p-button-rounded p-button-sm wh40"
        @click="toggleShare"
        aria-haspopup="true"
      />
      <Button
        icon="pi pi-ellipsis-v"
        class="p-button-rounded wh40"
        @click="toggleDots"
        aria-controls="overlay_menu"
      />
      <Menu
        ref="dotsMenu"
        :model="dotsItems"
        :popup="true"
        class="episode-tools-menu"
      />
      <Menu
        ref="shareMenu"
        :model="shareItems"
        :popup="true"
        class="episode-tools-menu"
      />
      <div class="hidden">
        <ShareNetwork
          class="facebookShareRef"
          network="facebook"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
          >Share on Facebook</ShareNetwork
        >
        <ShareNetwork
          class="twitterShareRef"
          network="twitter"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
          twitter-user="Radiolab"
          >Share on Twitter</ShareNetwork
        >
        <ShareNetwork
          class="emailShareRef"
          network="email"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
          >Share on Email</ShareNetwork
        >
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
