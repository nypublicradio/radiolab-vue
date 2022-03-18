<script setup>
//import { ref/* , computed, onMounted, defineEmit */ } from "vue"
import VFlexibleLink from 'nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const menuItems = useHeaderMenu()

</script>

<template>
  <div class="site-header">
    <section>
      <div class="content max-width flex lg:block align-items-center justify-content-between pr-3">
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
        <v-flexible-link raw to="news">
          <Button class="flex lg:hidden p-button-rounded">Become a member</Button>
        </v-flexible-link>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.site-header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--header-z-index);
  transition: background-color var(--transition-duration);
  -webkit-transition: background-color var(--transition-duration);
  background-color: var(--white);
  &.at-top {
    background-color: transparent;
    .p-submenu-list {
      &:after {
        border-color: transparent !important;
        background-color: transparent !important;
      }
    }
  }
  section {
    justify-items: stretch;
    .content {
      padding: spacingTRBL(0, 10, 0, 10);
      @include media("<lg") {
        //padding: spacingTRBL(0, 6, 0, 6);
        padding: 0;
      }
      @include media("<md") {
        // padding: spacingTRBL(0, 1, 0, 1);
        padding: 0;
      }
    }

    .p-menubar:not(.p-menubar-mobile-active) {
      // desktop menu
      height: var(--header-height);
      background: transparent;
      border: none;
      padding: 1rem 0.5rem;
      .p-menubar-button {
        color: var(--black100);
        .pi-bars {
          transform: scaleX(0.8);
        }
      }
      .p-menubar-root-list > .p-menuitem-active > .p-submenu-list {
        display: flex;
      }
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
        position: unset;
        &.gap {
          @media (min-width: 1440px) {
            margin-left: 290px !important;
          }
          @include media(">lg") {
            margin-left: calc(50vw - 430px);
          }
        }
        //top menu
        .p-menuitem-link {
          background: transparent !important;
          position: relative;
          border-radius: 2rem;
          overflow: visible;
          .p-ink {
            display: none;
          }
          .p-submenu-icon {
            color: var(--black100) !important;
            font-size: 0.75rem;
            margin-left: 0.2rem;
            margin-top: 0.2rem;
          }
          .p-menuitem-icon {
            display: none;
          }
          &:after {
            content: "";
            height: 1px;
            background: var(--black100);
            position: absolute;
            bottom: -1rem;
            width: calc(100% - 2rem);
            left: 0;
            right: 0;
            margin: auto;
            pointer-events: none;
            opacity: 0;
            transition: opacity var(--transition-duration);
            -webkit-transition: opacity var(--transition-duration);
          }
          &:hover {
            background: transparent;
            &:after {
              opacity: 1;
            }
          }
        }
        // submenus
        .p-submenu-list {
          margin-top: 1rem;
          box-shadow: none;
          flex-direction: row;
          justify-content: center;
          width: auto;
          background: transparent;
          top: 0;
          opacity: 0;
          pointer-events: none;
          transition: top var(--transition-duration),
            opacity var(--transition-duration);
          -webkit-transition: top var(--transition-duration),
            opacity var(--transition-duration);
          display: flex;
          z-index: -1;
          .p-menuitem-link {
            &:after {
              bottom: -0.4rem;
            }
          }
        }
        &.p-menuitem-active {
          .p-menuitem-link:after {
            opacity: 1;
          }
          .p-submenu-list {
            top: 53px;
            opacity: 1;
            pointer-events: auto;
            &:after {
              transition: background-color var(--transition-duration),
                border-color var(--transition-duration);
              -webkit-transition: background-color var(--transition-duration),
                border-color var(--transition-duration);
              background-color: var(--white);
              content: "";
              left: -100vw;
              top: 1px;
              position: absolute;
              width: 200vw;
              height: 47px;
              z-index: -1;
              border-top: 1px solid var(--primary-color);
              border-bottom: 1px solid var(--primary-color);
            }
            .p-menuitem-link:after {
              opacity: 0;
            }
          }
          .p-submenu-list .p-menuitem-link {
            &:hover {
              &:after {
                opacity: 1;
              }
            }
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
    // mobile menu
    .p-menubar.p-menubar-mobile-active {
      border: none;
      padding: 0;
      .p-menubar-button {
        color: var(--black100);
        z-index: 1002;
        width: 100vw;
        padding-left: 2rem;
        margin-left: -1rem;
        justify-content: flex-start;
        background: white;
        border-radius: 0;
        height: var(--header-height);
        .pi-bars {
          &:before {
            content: "\e90b";
          }
        }
        &:focus {
          box-shadow: none;
        }
      }
      .p-menubar-root-list {
        align-items: flex-start;
        box-shadow: none;
        position: absolute;
        width: 100vw;
        height: 100vh;
        overflow-y: auto;
        top: 0;
        padding: 0;
        padding-top: spacing(8);
        padding-bottom: spacing(12);
        .p-menuitem {
          width: auto;
          .p-menuitem-link {
            margin-top: spacing(8);
            margin-bottom: 0;
            padding-bottom: 0;
            pointer-events: none;
            .p-submenu-icon {
              display: none;
            }
          }
          .p-submenu-list {
            display: block;
            .p-menuitem-link {
              pointer-events: auto;
              margin-top: spacing(0);
              padding: 0.4rem 1rem;
              font-size: var(--font-size-8);
            }
          }
          &.alone {
            margin-top: spacing(8);
            .p-menuitem-link {
              pointer-events: auto;
              margin-top: spacing(0);
              padding: 0.4rem 1rem;
              font-size: var(--font-size-8);
            }
          }
          &.button {
            .p-menuitem-link {
              margin-left: spacing(4) !important;
            }
          }
        }
      }
    }
    .p-menubar {
      // both desktop and menu styles
      .p-menuitem {
        // simulate regular Button
        &.button {
          .p-menuitem-link {
            background: var(--primary-color) !important;
            border-radius: 2rem;
            padding: 0.75rem 1.5rem !important;
            transition: background var(--transition-duration);
            -webkit-transition: background var(--transition-duration);
            &:hover {
              background: var(--black100) !important;
              .p-menuitem-text {
                color: var(--primary-color) !important;
              }
            }
            &:after {
              display: none;
            }
            .p-menuitem-text {
              transition: color var(--transition-duration);
              -webkit-transition: color var(--transition-duration);
            }
            .p-menuitem-icon {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
