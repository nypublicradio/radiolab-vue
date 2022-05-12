<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search',
  },
  isSearching: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search'])

onMounted(() => {})

const searchValue = ref('')

const onSearchEnter = (event) => {
  if (searchValue.value) {
    emit('search', searchValue.value)
  }
}
</script>

<template>
  <div class="search-field p-input-icon-left">
    <i class="pi" :class="isSearching ? 'pi-spin pi-spinner' : 'pi-search'" />
    <InputText
      type="search"
      :disabled="isSearching"
      v-model="searchValue"
      :placeholder="props.placeholder"
      @keyup.enter="onSearchEnter"
    />
  </div>
</template>

<style lang="scss">
.search-field,
.p-input-icon-left {
  width: 100%;
  text-align: right;
  i,
  i:first-of-type {
    color: var(--black100);
    display: flex;
    font-weight: bold;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-items: center;
    align-content: center;
    justify-content: center;
    left: 1.4rem;
    font-size: 11px;
    &.pi-spin {
      font-size: 1rem;
      color: var(--blue-500);
      animation: 'fa-spin' 0.5s linear infinite;
    }
  }
  input,
  .p-inputtext {
    border: none;
    width: 100%;
    padding: 0.95rem;
    padding-left: 3rem;
    background-color: var(--white100);
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: var(--gray-200);
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--gray-200);
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: var(--gray-200);
    }
  }
}
</style>
