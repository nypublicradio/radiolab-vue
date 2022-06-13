<script setup>
import { ref, computed, onBeforeMount, defineEmits } from 'vue'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const isStaff = ref(false)

const props = defineProps({
    data: {
      type: Object,
      default: null,
    },
})

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onBeforeMount(() => {
    // detect if user is logged in   
    console.log(localStorage.getItem('ember_simple_auth-session'))
    isStaff.value = true
    
})

const editThisContent = () => {
    window.open(`${config.ADMIN_CMS_ROOT}${props.data['edit-link']}`, '_blank');
}
</script>

<template>
  <div>
    <div v-if="isStaff" class="cms-edit-button">
      <Button
        title="Edit this episode in the CMS"
        icon="pi pi-user-edit"
        class="cms-edit-button p-button-rounded p-button-sm"
        @click="editThisContent"
        aria-label="Edit this content in the CMS"
      />
    </div>
  </div>
</template>

<style lang="scss" scopped>
.cms-edit-button {
  position: absolute;
  padding: 0.5rem;
  z-index: 10;
  .cms-edit-button {
  }
}
</style>
