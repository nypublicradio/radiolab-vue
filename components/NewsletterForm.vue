<script setup>
import { ref } from 'vue'
import axios from 'axios'

const submitted = ref(false)
const submissionStatus = ref(null)
const email = ref('')

// submit the newsletter form and add email address to the Radiolab Newsletter list
// list IDs are listed here https://github.com/nypublicradio/marketing-cloud-proxy/blob/main/marketing_cloud_proxy/mailchimp.py
function submitForm() {
    submitted.value = true
    axios
        .post('https://api.prod.nypr.digital/email-proxy/subscribe',
        {
            list: '2fe8150dd6',
            email: email.value,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    )
    .then(() => {
        submissionStatus.value = 'success'
    })
    .catch(() => {
        submissionStatus.value = 'error'
        submitted.value = false
    })
}
</script>

<template>
    <div class="newsletter-form">
        <span v-if="submissionStatus !== 'success'" class="grid">
            <div class="col-12 lg:col-8">
                <InputText
                    :disabled="submitted"
                    class="w-full p-inputtext-lg"
                    :class="[{ 'p-invalid': submissionStatus === 'error' }]"
                    type="email"
                    placeholder="Email address"
                    aria-describedby="email-address-field"
                    v-model="email"
                    @keypress.enter="submitForm" 
                />
                <small
                    v-if="submissionStatus === 'error'"
                    id="email-address-field"
                    class="p-error"
                >
                    Sorry, there was an error with your submission. Please try again!
                </small>
            </div>
            <div class="col-12 lg:col-4 lg:justify-content-start">
                <Button :disabled="submitted" @click="submitForm" class="p-button-lg p-button-rounded" label="Subscribe">
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
    font-size: 1.25rem;
    margin: auto;
}
</style>