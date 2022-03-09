<script setup>
import { ref/* , computed, onMounted, defineEmit */ } from "vue"

const menuItems = ref([
  {
    label: 'Podcasts',
    items: [
      {
        label: 'Episodes',
        to: '/news',
      },
      {
        label: 'Radio Shows',
      },
      {
        label: 'Projects',
      },
      {
        label: 'Radiolab for Kids',
      }
    ]
  },
  {
    label: 'About',
    items: [
      {
        label: 'About the Show',
      },
      {
        label: 'Team',
      },
      {
        label: 'Announcements',
      },
      {
        label: 'Read the Credits',
      },
      {
        label: 'Pitch us',
      }
    ]
  },
  {
    label: 'For listeners',
    items: [
      {
        label: 'The Lab',
      },
      {
        label: 'Read the Credits',
      },
      {
        label: 'Merch Store',
      }
    ]
  }
])

const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

//const emit = defineEmit(["change", "click"]);

// lifecycle hooks
// onMounted(() => {

// })
</script>

<template>
  <div>
    <Menubar :model="menuItems">
      <template #start>
        <nuxt-link to="/">
          <img alt="logo" src="/rl-logo-no-icon.svg" class="logo mr-2" />
        </nuxt-link>
      </template>
      <template #end>
        <Menubar :model="[menuItems[0], menuItems[1]]"></Menubar>
      </template>
    </Menubar>
  </div>
</template>

<style lang="scss">
.p-menubar {
  justify-content: space-between;
  .logo {
    width: 100px;
    height: auto;
  }
  .p-menubar-end {
    margin-left: unset;
  }
}
</style>
