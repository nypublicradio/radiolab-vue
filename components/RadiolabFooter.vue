<script setup>
import { onMounted, onBeforeMount } from "vue"
import VFlexibleLink from 'nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import BecomeMember from './BecomeMember.vue'
import Newsletter from './Newsletter.vue'
const menuItems = useHeaderMenu()
const menuItemsFooter = ref([])
const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})
//const emit = defineEmit(["change", "click"]);

// lifecycle hooks
onMounted(() => {
  console.log('menuItems = ', menuItems.value)
  for (const [i, v] of menuItems.value.entries()) {
    if (v.items) {
      for (const [i, item] of v.items.entries()) {
        menuItemsFooter.value.push(item)
      }
    } else {
      menuItemsFooter.value.push(v)
    }
  }
})
</script>

<template>
  <div class="site-footer" data-color-mode="blue">
    <div class="grid">
      <div class="col-12 md:col-6">
        <become-member />
      </div>
      <div class="col-12 md:col-6">
        <!-- <subscribe-section /> -->
        <newsletter />
      </div>
    </div>
    <div class="grid mt-8">
      <div class="col-12 md:col-2 flex flex-column justify-content-between">
        <!-- <subscribe-section /> -->
        <p>Test the outer edges of what you think you know</p>
        <span>
          <p>Produced by WNYC Studios</p>
          <p>© 2022 WNYC Studios</p>
        </span>
      </div>
      <div class="col-12 md:col-10">
        <!-- <subscribe-section /> -->

        <!-- <ul role="menubar">
      <li v-for="item in menuItemsFooter" role="none" class="menuitem">
        <v-flexible-link :to="item.to ? item.to : item.url">
          <Button class="p-button-text p-button-plain">{{ item.label }}</Button>
        </v-flexible-link>
      </li>
        </ul>-->
        <div class="menu mb-6 px-0 md:px-8" role="menubar">
          <div v-for="item in menuItemsFooter" role="none" class="menu-item">
            <v-flexible-link :to="item.to ? item.to : item.url">
              <Button class="p-button-text p-button-plain">{{ item.label }}</Button>
            </v-flexible-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <Menubar :model="menuItemsFooter"></Menubar> -->
</template>

<style lang="scss">
.site-footer {
  padding: spacing(4);
  background-color: #0454d6;
  h2 {
    font-size: var(--font-size-16);
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 220px;

    .menu-item {
      .flexible-link,
      .flexible-link .p-button {
        text-decoration: none !important;
        color: #f4f2f0;
        font-size: var(--font-size-5);
      }
    }
  }
  /* ul {
    display: block;
    column-count: 4;
    column-gap: 0px;
    list-style-type: none;
    .menu-item {
      width: 100px;
      .flexible-link,
      .flexible-link .p-button {
        text-decoration: none !important;
      }
    }
  } */
  /*   .p-menubar {
    ul {
      // flex-wrap: wrap;
      // flex-direction: column;
      display: block;
      column-count: 4;
      .p-menuitem {
        width: 200px;
        .p-menuitem-link {
          .p-menuitem-icon {
            display: none;
          }
        }
      }
    }
  } */
}
</style>
