<script setup>
import { ref/* , computed, onMounted, defineEmit */ } from "vue"

/* const props = defineProps({
  bp: {
    type: String,
    default: 'md',
  },
}) */

//const emit = defineEmit(["change", "click"]);

const emailAddress = ref('')
const emailAddressError = ref(false)
const submitEmail = () => {
  //validate etc...
  console.log('submitEmail', emailAddress.value)
}

</script>

<template>
  <div class="newsletter">
    <div class="grid">
      <div :class="`col-12 left`">
        <h2>Sign up for the newsletter</h2>
      </div>
      <div :class="`col-12 right w-100 mt-4`">
        <span class="white-space-nowrap flex">
          <div class="field flex-grow-1">
            <InputText
              class="w-full p-inputtext-lg"
              :class="[{ 'p-invalid': emailAddressError }]"
              type="email"
              placeholder="Email address"
              aria-describedby="email-address-field"
              v-model="emailAddress"
            />
            <small
              v-if="emailAddressError"
              id="email-address-field"
              class="p-error"
            >Username is not available.</small>
          </div>
          <Button @click="submitEmail" class="p-button-lg" label="Subscribe" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.newsletter {
  .left {
    .icon {
      width: 45px;
      height: auto;
      vertical-align: middle;
    }
  }
  .right {
    .field {
      margin-bottom: 0;
      * {
        display: block;
      }
      .p-error {
        position: absolute;
      }
    }
  }
}
</style>
