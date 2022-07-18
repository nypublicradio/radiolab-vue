<script setup>
import { ref } from 'vue'
import { yearFilterOptions } from '~/utilities/constants'

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

const emit = defineEmits(['search', 'update', 'year'])

const selectedYear = ref()
const searchValue = ref('')

// method triggered when the user presses the ENTER key
const onSearchEnter = (event) => {
  if (searchValue.value) {
    emit('search', searchValue.value)
  }
}
</script>

<template>
  <div class="fields">
    <Dropdown
      title="Choose a year"
      :options="yearFilterOptions"
      v-model="selectedYear"
      option-label="year"
      placeholder="Year"
      aria-label="Filter by year"
      aria-labelled-by="Filter by year"
      @change="emit('year', selectedYear.year)"
    >
    </Dropdown>
    <div class="search-field p-input-icon-left">
      <i class="pi" :class="isSearching ? 'pi-spin pi-spinner' : 'pi-search'" />
      <!-- :disabled="isSearching" -->
      <InputText
        type="search"
        v-model="searchValue"
        :placeholder="props.placeholder"
        @keyup.enter="onSearchEnter"
      />
    </div>
  </div>
</template>

<style lang="scss">
.fields {
  display: flex;
  gap: 1rem;
  @include media('<lg') {
    width: 100%;
    gap: 0.5rem;
  }
  .p-dropdown {
    border: none;
    border-radius: 2rem;
    background-color: var(--white100);
    .p-dropdown-label {
      @include media('<md') {
        padding-left: 1rem;
      }
    }
    .p-dropdown-trigger {
      margin-right: 12px;
      @include media('<md') {
        width: 1rem;
      }
      .p-dropdown-trigger-icon {
        font-size: 0.75rem;
        color: var(--black100);
      }
    }
    .p-placeholder {
      color: var(--gray-200);
    }
  }
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
      /* clears the ‘X’ from IE */
      &[type='search']::-ms-clear {
        display: none;
        width: 0;
        height: 0;
      }
      &[type='search']::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
      /* clears the ‘X’ from Chrome */
      &[type='search']::-webkit-search-decoration,
      &[type='search']::-webkit-search-cancel-button,
      &[type='search']::-webkit-search-results-button,
      &[type='search']::-webkit-search-results-decoration {
        display: none;
      }
    }
  }
}
</style>
