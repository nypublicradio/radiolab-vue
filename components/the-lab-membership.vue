<script setup>
import { ref, onMounted } from 'vue'
import { tiers, options } from '~/utilities/membershipsData.js'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const theTiers = ref(null)
const theOptions = ref(null)
const contentIndex = ref(0)

onMounted(() => {
  theTiers.value = tiers
  theOptions.value = options
})

/**
 * Function connected to the emitter from the Carousel component when the content has changed, it provides the index of the page showing 
 */
const carouselEmitGetCurrPageIndex = (ind) => {
  contentIndex.value = ind
}

</script>

<template>
  <div class="the-lab-memberships">
    <div v-if="theTiers" class="desktop hidden md:block">
      <div class="grid mb-3">
        <div class="col-3"></div>
        <div v-for="(tier, index) in theTiers" class="col-3" :key="`${tier.label}-${index}`">
          <the-lab-tier
            :icon="tier.icon"
            :name="tier.name"
            :cost="tier.cost"
            :style="`margin-top:${index === 1 ? '-23' : 0}px;`"
          />
        </div>
      </div>
      <the-lab-options :tiers="theTiers" :options="theOptions" />
    </div>
    <div v-if="theTiers && theOptions" class="mobile md:hidden">
      <div class="icons flex justify-content-around mb-3">
        <img :class="{ 'selected': contentIndex === 0 }" src="/the-lab/viper.svg" alt="viper icon" />
        <img
          :class="{ 'selected': contentIndex === 1 }"
          src="/the-lab/butterfly.svg"
          alt="butterfly icon"
        />
        <img
          :class="{ 'selected': contentIndex === 2 }"
          src="/the-lab/shrimp.svg"
          alt="shrimp icon"
        />
      </div>
      <Carousel
        :value="theTiers"
        :numVisible="1"
        :numScroll="1"
        @update:page="carouselEmitGetCurrPageIndex"
      >
        <template #item="slotProps">
          <div
            class="p-carousel-items-content"
            @touchstart.native.stop
            @touchmove.native.stop
            @touchend.native.stop
          >
            <div class="content-holder">
              <div class="mb-5">
                <the-lab-tier :name="slotProps.data.name" :cost="slotProps.data.cost" />
              </div>
              <the-lab-options-mobile
                :tiers="theTiers"
                :options="theOptions"
                :index="slotProps.data.index"
              />
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="grid mt-0 md:mt-4">
      <div class="col col-12 md:col-3"></div>
      <div class="col col-12 md:col-9 text-center px-3">
        <p>On occasion we may adjust benefits based on member feedback or other factors. We'll always give you a heads-up when a change is coming.</p>
        <p class="mt-4">
          Already a member?
          <v-flexible-link to="https://members.radiolab.org/request_access">Log in</v-flexible-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mobile {
  .icons {
    max-width: 360px;
    display: block;
    margin: 0 auto;
    img {
      transition: all 0.5s;
      -webkit-transition: all 0.5s;
      filter: grayscale(100%);
      opacity: 0.3;
      &.selected {
        filter: grayscale(0%);
        opacity: 1;
      }
    }
  }
  .p-carousel {
    .p-carousel-content .p-carousel-next,
    .p-carousel-content .p-carousel-prev {
      color: var(--text-color);
      align-self: flex-start;
      top: 40px;
      z-index: 10;
      &.p-disabled {
        color: var(--gray-200) !important;
      }
    }
    .p-carousel-content .p-carousel-next {
      right: 40px;
    }
    .p-carousel-content .p-carousel-prev {
      left: 40px;
    }
    .p-carousel-item {
      visibility: visible !important;
    }
  }
}
</style>
