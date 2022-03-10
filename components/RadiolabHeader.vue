<script setup>
import { ref/* , computed, onMounted, defineEmit */ } from "vue"
const menuItems = useHeaderMenu()

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
  <div class="header">
    <Menubar :model="menuItems">
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
.header {
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
}
</style>
