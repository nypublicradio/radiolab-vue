<script setup>
import { ref } from 'vue'
import { formatDate, copyToClipBoard } from '~/utilities/helpers'
import PlaySelector from '~/components/PlaySelector.vue'
import { createToast } from 'mosha-vue-toastify'
import { ShareNetwork } from 'vue-social-sharing'
const config = useToastConfig()
const configDanger = useToastConfig('danger')

const props = defineProps({
  episode: {
    type: Object,
    default: null,
  }
})

const visibleRight = ref(false)
const dotsMenu = ref()
const shareMenu = ref()
const facebookShareRef = ref(null)
const twitterShareRef = ref(null)
const toastConfig = ref(config)
const toastConfigDanger = ref(configDanger)
const dotsItems = ref([
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: () => {
      window.open(props.episode['audio'], '_top')
      createToast({ title: 'Downloading episode audio file', description: 'Check your system\'s downloads folder' }, toastConfig.value)
    }
  },
  {
    label: 'Embed',
    icon: 'pi pi-code',
    command: () => {
      if (copyToClipBoard(props.episode['embed-code'])) {
        createToast('Embed code copied to the clipboard', toastConfig.value)
      } else {
        createToast({ title: 'Copy to clipboard failed', description: 'Try again another time' }, toastConfigDanger.value)
      }
    }
  }
])

const shareItems = ref([
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      var facebookShare = document.getElementsByClassName('facebookShareRef')
      facebookShare[0].click()
    }
  },
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      var twitterShare = document.getElementsByClassName('twitterShareRef')
      twitterShare[0].click()
    }
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      if (copyToClipBoard(props.episode['url'])) {
        createToast('Episode link copied to the clipboard', toastConfig.value)
      } else {
        createToast({ title: 'Copy to clipboard failed', description: 'Try again another time' }, toastConfigDanger.value)
      }
    }
  }
])

const toggleDots = (event) => {
  dotsMenu.value.toggle(event)
}
const toggleShare = (event) => {
  shareMenu.value.toggle(event)
}

</script>

<template>
  <div>
    <div class="episode-tools-holder flex flex-wrap lg:flex-nowrap">
      <play-selector :episode="props.episode" menu-class="episode-tools-play-selector" />
      <Button
        v-if="!!props.episode['transcript']"
        class="p-button-sm p-button-rounded"
        label="Transcript"
        @click="visibleRight = true"
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
      <Sidebar
        v-model:visible="visibleRight"
        class="transcript p-sidebar-lg"
        :baseZIndex="1000"
        position="right"
      >
        <h5 class="mt-4">Transcript</h5>
        <Divider />
        <div class="my-5">
          <p class="date">{{ formatDate(props.episode['publish-at']) }}</p>
          <h2 class="title mb-0 md:mb-4" v-html="episode.title" />
        </div>
        <Divider />
        <div
          v-if="!!props.episode['transcript']"
          v-html="props.episode['transcript']"
          class="transcript-body mt-2 html-formatting"
        ></div>
      </Sidebar>
      <Menu ref="dotsMenu" :model="dotsItems" :popup="true" class="episode-tools-menu" />
      <Menu ref="shareMenu" :model="shareItems" :popup="true" class="episode-tools-menu" />
      <div class="hidden">
        <ShareNetwork
          class="facebookShareRef"
          network="facebook"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
        >Share on Facebook</ShareNetwork>
        <ShareNetwork
          class="twitterShareRef"
          network="twitter"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
          twitter-user="Radiolab"
        >Share on Twitter</ShareNetwork>
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
    @include media("<#{$toolsBrealPoint}") {
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
.transcript {
  background-color: var(--primary-color);
  .p-sidebar-header .p-sidebar-close {
    color: var(--black100);
  }
  @include media(">md") {
    &.p-sidebar-lg {
      width: 768px !important;
    }
  }
  @include media("<md") {
    &.p-sidebar-lg {
      width: 100% !important;
    }
  }
  .p-sidebar-content {
    margin-top: -64px;
    padding-right: spacing(8);
    .title {
      font-size: var(--font-size-12);
      line-height: var(--font-size-13);
      font-weight: 400;
      @include media("<md") {
        font-size: var(--font-size-8);
        line-height: var(--font-size-9);
      }
    }
  }
  .p-sidebar-header {
    z-index: 1;
  }
}
</style>
