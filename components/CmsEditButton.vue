<script setup>
import { ref, onMounted } from 'vue'
import { useCmsSession } from '~/composables/states'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const isStaff = ref(false)
const cmsSession = await useCmsSession()

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

onMounted(() => {
  // detect if user is logged in
  isStaff.value = cmsSession.is_staff
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
  <div v-if="isStaff" class="cms-edit-button">
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
