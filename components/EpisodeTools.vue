<script setup>
import { ref } from 'vue'
import PlaySelector from '~/components/PlaySelector.vue'
const dotsMenu = ref()
const shareMenu = ref()
const dotsItems = ref([
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: () => {
      console.log('downloading...')
    }
  },
  {
    label: 'Embed',
    icon: 'pi pi-code',
    command: () => {
      console.log('embedding...')
    }
  }
])
const shareItems = ref([
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      console.log('facebook...')
    }
  },
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      console.log('twitter...')
    }
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      console.log('copy link...')
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
    <div class="episode-tools-holder flex">
      <play-selector :label="false" />
      <Button class="p-button-sm p-button-rounded" label="Transcript"></Button>
      <Button
        icon="pi pi-share-alt"
        class="p-button-rounded"
        @click="toggleShare"
        aria-haspopup="true"
      />
      <Button
        icon="pi pi-ellipsis-v"
        class="p-button-rounded"
        @click="toggleDots"
        aria-controls="overlay_menu"
      />
      <Menu ref="dotsMenu" :model="dotsItems" :popup="true" class="episode-tools-menu" />
      <Menu ref="shareMenu" :model="shareItems" :popup="true" class="episode-tools-menu" />
    </div>
  </div>
</template>

<style lang="scss">
.episode-tools-holder {
  gap: 6px;
  width: 100%;
  .play-selector {
    margin-left: 0;
    width: 85px;
    flex-grow: 0;
    background-color: var(--primary-color);
    border-radius: 2rem;
  }
}
.episode-tools-menu.episode-tools-menu {
  box-shadow: none;
  background-color: var(--primary-color);
  padding: 0.5rem;
  .p-menuitem-link {
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
