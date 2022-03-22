<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'

const submitted = ref(false)
const submissionStatus = ref(null)
const email = ref('')

// submit the newsletter form and add email address to the Radiolab Newsletter list
// list IDs are listed here https://github.com/nypublicradio/marketing-cloud-proxy/blob/main/marketing_cloud_proxy/mailchimp.py
function submitForm() {
    submitted.value = true
    axios
        .post('https://api.demo.nypr.digital/email-proxy/subscribe',
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
    <div>
        <span v-if="submissionStatus !== 'success'" class="grid">
            <div class="field col-12 lg:col-8 justify-content-center">
                <InputText
                    v-if="!submitted"
                    class="w-full p-inputtext-lg"
                    :class="[{ 'p-invalid': submissionStatus === 'error' }]"
                    type="email"
                    placeholder="Email address"
                    aria-describedby="email-address-field"
                    v-model="email"
                    @keypress.enter="submitForm" 
                />
                <skeleton v-else class="transparent mt-3" />
                <small
                    v-if="submissionStatus === 'error'"
                    id="email-address-field"
                    class="p-error"
                >
                    Sorry, there was an error with your submission. Please try again!
                </small>
            </div>
            <div class="col-12 lg:col-4 align-self-end flex lg:justify-content-start justify-content-end">
                <Button v-if="!submitted" @click="submitForm" class="p-button-lg p-button-rounded" label="Subscribe" />
            </div>
        </span>
        <p v-else>Thanks for signing up!</p>
    </div>
</template>