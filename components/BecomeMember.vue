<script setup>
//import { ref, computed, onMounted, defineEmit } from "vue"
import VFlexibleLink from 'nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const router = useRouter()
/* const props = defineProps({
  bp: {
    type: String,
    default: 'md',
  },
}) */
const routeTo = (page) => {
  router.push(page)
}
const linkTo = (url) => {
  window.open(url, '_blank')
}
//const emit = defineEmit(["change", "click"]);

</script>

<template>
  <div class="become-a-member">
    <div class="grid">
      <div :class="`col-12 left md:pr-8`">
        <h2>
          Unlock exclusives
          <span class="white-space-nowrap">
            in The Lab
            <span>
              <img alt="icon" src="/rl-icon-stripes.svg" class="icon" />
            </span>
          </span>
        </h2>
      </div>
      <div :class="`col-12 right mt-4`">
        <v-flexible-link to="/" raw class="mt-4">
          <Button class="p-button-lg p-button-rounded" label="Become a member" />
        </v-flexible-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.become-a-member {
  .left {
    .icon {
      width: 45px;
      height: auto;
      vertical-align: middle;
    }
  }
  .right {
  }
}
</style>
