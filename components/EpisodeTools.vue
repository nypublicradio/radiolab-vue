<script setup>
import { ref } from 'vue'
import { formatDate, copyToClipBoard, shareAPI, toastGlobalConfig } from '~/utilities/helpers'
import PlaySelector from '~/components/PlaySelector.vue'
import { createToast } from 'mosha-vue-toastify'
import { ShareNetwork } from 'vue-social-sharing'

const props = defineProps({
  episode: {
    type: Object,
    default: null,
  }
})

const toastConfig = ref(toastGlobalConfig())
const toastConfigDanger = ref(toastGlobalConfig({ type: 'danger' }))

const visibleRight = ref(false)
const dotsMenu = ref()
const shareMenu = ref()
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
      copyToClipBoard(props.episode['embed-code'], 'Embed code copied to clipboard')
    }
  }
])

const shareItems = ref([
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      var twitterShare = document.getElementsByClassName('twitterShareRef')
      twitterShare[0].click()
    }
  },
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      var facebookShare = document.getElementsByClassName('facebookShareRef')
      facebookShare[0].click()
    }
  },
  {
    label: 'Email',
    icon: 'pi pi-envelope',
    command: () => {
      var emailShare = document.getElementsByClassName('emailShareRef')
      emailShare[0].click()
    }
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      shareAPI({
        title: props.episode['title'],
        text: props.episode['tease'],
        url: props.episode['url']
      }, 'Episode link copied to the clipboard')
    }
  }
])

// toggle function for dot menu
const toggleDots = (event) => {
  dotsMenu.value.toggle(event)
}
// toggle function for dot menu
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
        <ShareNetwork
          class="emailShareRef"
          network="email"
          :url="props.episode['url']"
          :title="props.episode['title']"
          :description="props.episode['tease']"
          :quote="props.episode['show-tease'].replace(/<\/?[^>]+(>|$)/g, '')"
          :hashtags="props.episode['tags'].join()"
        >Share on Email</ShareNetwork>
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
    @include media("<#{$toolsBreakPoint}") {
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
