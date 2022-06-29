<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const isOnDemo = ref(config.ENV === 'demo' ? true : false)

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  path: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
})

// manage condition and return the CMS link
const cmsLink = () => {
  if (props.data) {
    //use episode data edit-link
    return `${config.ADMIN_CMS_ROOT}${props.data['edit-link']}`
  } else {
    //use path prop for tout/bucket
    return `${config.ADMIN_CMS_ROOT}${props.path}`
  }
}

// triggered wher the button is clicked to open the desired CMS link in a new tab
const editThisContent = () => {
  window.open(cmsLink(), '_blank')
}
</script>

<template>
  <div v-if="isOnDemo" class="cms-edit-button">
    <Button
      icon="pi pi-user-edit"
      class="cms-edit-button p-button-rounded p-button-sm"
      @click="editThisContent"
      :aria-label="props.label ? props.label : 'Edit this content in the CMS'"
      v-tooltip="{
        value: props.label ? props.label : 'Edit this content in the CMS',
        class: 'cms-button-tooltip',
      }"
    />
  </div>
</template>

<style lang="scss">
.cms-button-tooltip {
  z-index: 10;
}
</style>
