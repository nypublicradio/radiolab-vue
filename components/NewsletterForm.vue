<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'
const { $analytics } = useNuxtApp()
const config = useRuntimeConfig()

const submitted = ref(false)
const submissionStatus = ref(null)
const email = ref('')

const props = defineProps({
  location: {
    type: String,
    default: null,
  },
})

// submit the newsletter form and add email address to the Radiolab Newsletter list
// list IDs are listed here https://github.com/nypublicradio/marketing-cloud-proxy/blob/main/marketing_cloud_proxy/mailchimp.py
function submitForm() {
  submitted.value = true
  let sourceLocation = 'radiolab_footer'
  if (props.location === 'home page') {
    sourceLocation = 'radiolab_homePage'
  }
  axios
    // .post(`https://api.prod.nypr.digital/email-proxy/subscribe`,
    .post(`${config.API_URL}/email-proxy/subscribe`, {
      list: '2fe8150dd6',
      email: email.value,
      source: sourceLocation,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(() => {
      submissionStatus.value = 'success'
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: `Newsletter Signup: ${props.location}`,
        event_label: 'Success',
      })
    })
    .catch(() => {
      submissionStatus.value = 'error'
      submitted.value = false
      $analytics.sendEvent('click_tracking', {
        event_category: 'Click Tracking',
        component: `Newsletter Signup: ${props.location}`,
        event_label: 'Error',
      })
    })
}
</script>

<template>
  <div class="newsletter-form">
    <span
      v-if="submissionStatus !== 'success'"
      class="flex flex-column lg:flex-row"
      style="gap: 1rem"
    >
      <div class="flex-grow-1">
        <InputText
          :disabled="submitted"
          class="w-full p-inputtext-lg"
          :class="[{ 'p-invalid': submissionStatus === 'error' }]"
          type="email"
          placeholder="Email address"
          aria-describedby="email-address-field"
          v-model="email"
          autocomplete="email"
          name="email"
          @keypress.enter="submitForm"
        />
        <small
          v-if="submissionStatus === 'error'"
          id="email-address-field"
          class="p-error px-4 mt-1 block"
          >Sorry, there was an error with your submission. Please try
          again!</small
        >
      </div>
      <div class="flex justify-content-end lg:justify-content-start">
        <Button
          :disabled="submitted"
          @click="submitForm"
          class="p-button-lg p-button-rounded"
          label="Subscribe"
        >
          <i v-if="submitted" class="pi pi-spin pi-spinner" />
        </Button>
      </div>
    </span>
    <p v-else>Thanks for signing up!</p>
  </div>
</template>

<style lang="scss">
.newsletter-form .p-button {
  width: 135px;
  height: 47px;
}

.newsletter-form .pi-spinner {
  color: var(--white100);
  font-size: 1.25rem;
  margin: auto;
}
</style>
