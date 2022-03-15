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
      <div :class="`col-12 left lg:pr-8`">
        <h2>Sign up for the newsletter</h2>
      </div>
      <div :class="`col-12 right w-100 mt-4`">
        <span class="grid">
          <div class="field col-12 lg:col-8">
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
          <div
            class="col-12 lg:col-4 align-self-end flex lg:justify-content-start justify-content-end"
          >
            <Button @click="submitEmail" class="p-button-lg p-button-rounded" label="Subscribe" />
          </div>
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
