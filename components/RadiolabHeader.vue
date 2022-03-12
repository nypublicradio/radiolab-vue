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
  <div class="site-header">
    <section>
      <div class="content max-width">
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
    </section>
  </div>
</template>

<style lang="scss">
.site-header {
  section {
    background: var(--surface-100);
    .content {
      padding: spacingTRBL(0, 10, 0, 10);
      @include media("<lg") {
        padding: spacingTRBL(0, 6, 0, 6);
      }
      @include media("<md") {
        padding: spacingTRBL(0, 1, 0, 1);
      }
    }
    .p-menubar {
      background: transparent;
      border: none;
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
          @media (min-width: 1440px) {
            margin-left: 290px !important;
          }
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
}
</style>
