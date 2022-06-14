<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";
const config = useRuntimeConfig();
const isStaff = ref(false);

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
});

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {
  // detect if user is logged in
  console.log(localStorage.getItem("ember_simple_auth-session"));
  isStaff.value = true;
});

const cmsLink = () => {
  if (props.data) {
    //use episode data edit-link
    return `${config.ADMIN_CMS_ROOT}${props.data["edit-link"]}`;
  } else {
    //use path prop for tout/bucket
    return `${config.ADMIN_CMS_ROOT}${props.path}`;
  }
};

const editThisContent = () => {
  window.open(cmsLink(), "_blank");
};
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
