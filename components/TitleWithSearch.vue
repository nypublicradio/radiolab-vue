<script setup>
import { ref } from 'vue'
import SearchField from '~/components/SearchField.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
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
</script>

<template>
  <div class="title-with-search">
    <h1 class="h2 font-normal">Episode Archive</h1>
    <search-field
      :placeholder="props.placeholder"
      :isSearching="isSearching"
      @search="emit('search', $event)"
    />
  </div>
</template>

<style lang="scss">
.title-with-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  @include media('<md') {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-field {
    max-width: 300px;
    @include media('<md') {
      max-width: 100%;
    }
  }
}
</style>
