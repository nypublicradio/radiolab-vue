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
  },
  {
    label: 'How to listen',
    class: 'gap',
  },
  {
    label: 'Become a member',
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
    <Menubar :model="menuItems" autoDisplay="false">
      <template #start>
        <nuxt-link to="/" class="logo-holder-link">
          <img alt="logo" src="/rl-logo-no-icon.svg" class="logo mr-2" />
        </nuxt-link>
      </template>
      <!--  <template #end>
        <Button :label="menuItems[2].label" icon class="p-button-text p-button-plain" />
        <Button :label="menuItems[3].label" icon class="p-button-text p-button-plain" />
        
      </template>-->
    </Menubar>
  </div>
</template>

<style lang="scss">
.p-menubar {
  @include media(">lg") {
    justify-content: space-between;
  }
  .logo-holder-link {
    display: flex;
    .logo {
      width: 100px;
      height: auto;
    }
  }
  .p-menubar-button {
    order: -1;
  }
  .p-menuitem {
    &.gap {
      @include media(">lg") {
        margin-left: calc(50vw - 430px);
      }
    }
    .p-menuitem-link {
      .p-menuitem-icon {
        display: none;
      }
    }
  }
  .p-menubar-end {
    margin-left: unset;
    .nested-menu {
      border: none;
    }
  }
}
</style>
