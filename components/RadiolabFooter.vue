<script setup>
import { ref, onMounted } from 'vue'
import menuItemsImport from '../utilities/menuItems'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import BecomeMember from './BecomeMember.vue'
import Newsletter from './Newsletter.vue'
const menuItems = ref(menuItemsImport)
const menuItemsFooter = ref([])
const ignoredMenuItems = ref([])


// check if any of the items label mataches a string in the ignoredMenuItems array
const checkifIgnorded = (item) => {
  return !ignoredMenuItems.value.includes(item.label) ? true : false
}

onMounted(() => {
  for (const [i, v] of menuItems.value.entries()) {
    if (v.items) {
      for (const [i, item] of v.items.entries()) {
        if (checkifIgnorded(item)) menuItemsFooter.value.push(item)
      }
    } else {
      if (checkifIgnorded(v)) menuItemsFooter.value.push(v)
    }
  }
})
</script>

<template>
  <div class="site-footer" data-style-mode="blue">
    <section>
      <div class="content max-width">
        <div class="grid">
          <div class="col-12 md:col-6">
            <become-member />
          </div>
          <div class="col-12 md:col-6">
            <newsletter />
          </div>
        </div>
        <div class="grid mt-8 bottom">
          <div
            class="col-12 md:col-3 flex flex-column justify-content-between left"
          >
            <div class="mb-4 xl:pr-8">
              <img
                alt="small white Radiolab logo icon"
                src="/rl-icon-solid-white.svg"
                class="icon"
              />
              <p class="sub">Test the outer edges of what you think you know</p>
            </div>
          </div>
          <div class="col-12 md:col-9 right">
            <div class="menu mb:mb-6 px-0 md:pl-2 xl:pl-8 mt-0 md:mt-3">
              <div
                v-for="item in menuItemsFooter"
                class="menu-item"
                :key="item.to"
              >
                <v-flexible-link :to="item.to ? item.to : item.url">
                  {{ item.label }}
                </v-flexible-link>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mt-4">
              <p class="footer mb-2">Produced by WNYC Studios</p>
              <p class="footer">© 2022 WNYC Studios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.site-footer {
  section {
    background-color: var(--blue-500);
    padding-bottom: var(--player-height);

    .content {
      padding: spacing(10);

      @include media('<medium') {
        padding: spacing(4);
      }

      .bottom {
        .left {
          .icon {
            width: 16px;
            height: auto;
          }

          .sub {
            font-size: var(--font-size-8);
            line-height: var(--font-size-10);
          }
        }

        .right {
          .menu {
            column-count: 4;
            @include media('<xl') {
              column-count: 3;
            }

            @include media('<md') {
              margin: -1rem;
            }

            @include media('<sm') {
              column-count: 2;
            }

            .menu-item {
              display: inline-block;
              width: 100%;
              .flexible-link {
                padding: spacingTRBL(2.5, 5, 2.5, 5);
                position: relative;
                display: block;
                font-weight: var(--font-weight-400);
                text-decoration: none;
                font-size: var(--font-size-6);

                @include media('<xs') {
                  font-size: var(--font-size-5);
                }

                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
