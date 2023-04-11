<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const { $analytics } = useNuxtApp()
const props = defineProps({
  name: {
    type: String,
    default: 'unknown',
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  flagCode: {
    type: String,
    default: 'us',
  },
  quote: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div>
    <div
      class="testimonial-comp flex flex-column h-full justify-content-between"
    >
      <div class="quote-holder">
        <p class="quote pl-0 md:pl-3 pr-0 lg:pr-4 md:pr-8">
          “{{ props.quote }}”
        </p>
        <p class="pl-0 md:pl-3 mt-3">
          &#8212;{{ props.name }}, {{ props.city }}, {{ props.country }}
          <img
            src="/flag_placeholder.png"
            alt="flag image"
            :class="`flag flag-${props.flagCode} ml-1`"
          />
        </p>
      </div>
      <div class="bottom" data-style-mode="blue">
        <Divider />
        <div class="flex mt-5 align-items-center justify-content-between">
          <div>
            <div class="flex" style="gap: 1rem">
              <v-flexible-link to="https://members.radiolab.org" raw>
                <Button
                  class="p-button-rounded"
                  label="Become a member"
                  @click="
                    gaEvent(
                      'Click Tracking',
                      'The Lab Testimonial',
                      'Become a member'
                    )
                  "
                />
              </v-flexible-link>
              <v-flexible-link
                to="https://members.radiolab.org/request_access"
                raw
              >
                <Button
                  class="blue p-button-rounded p-button-outlined"
                  label="Sign in"
                />
              </v-flexible-link>
            </div>
          </div>
          <img
            class="rl-icon hidden sm:block"
            src="/rl-icon-stripes.svg"
            alt="radiolab icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.testimonial-comp {
  background-color: var(--blue-500);
  border-radius: 20px;
  overflow: hidden;
  padding: 2rem;
  .quote-holder {
    p {
      color: var(--white100);
      .flag {
        width: 22px;
      }
    }
    .quote {
      text-indent: -1rem;
      font-size: var(--font-size-13);
      line-height: var(--font-size-15);
      @include media('<xl') {
        text-indent: -0.5rem;
        font-size: var(--font-size-12);
        line-height: var(--font-size-14);
      }
      @include media('<md') {
        text-indent: -0.5rem;
        font-size: var(--font-size-8);
        line-height: var(--font-size-10);
      }
    }
  }
  .bottom {
    .p-divider {
      margin-left: -2em;
      width: calc(100% + 4em);
    }
    .rl-icon {
      width: 43px;
      height: auto;
    }
  }
}
</style>
