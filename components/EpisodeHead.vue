<script setup>
import { formatDate, formatPublisherImageUrl } from '~/utilities/helpers'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  pending: {
    type: Boolean,
    default: true,
  },
  episode: {
    type: Object,
    default: null,
  },
})

const route = useRoute()
const router = useRouter()

const imageCredits = ref(props.episode['image-main']['credits-name'])
const imageCreditsLink = ref(props.episode['image-main']['credits-url'])

// function to route to the transcript page
const onToggleTranscript = () => {
  router.push({ path: `${props.episode.slug}-transcript` })
}
</script>

<template>
  <div v-if="!pending" class="episode flex">
    <cms-edit-button :data="episode" label="Edit this Episode in the CMS" />
    <client-only>
      <v-image-with-caption
        v-if="episode['image-main']"
        :image="formatPublisherImageUrl(episode['image-main'].template)"
        :width="200"
        :height="200"
        :alt="episode['image-main']['alt-text']"
        :ratio="[1, 1]"
        :sizes="[1]"
        flat-quality
        :max-width="episode['image-main'].w"
        :max-height="episode['image-main'].h"
        class="episode-image"
      />
    </client-only>
    <div class="episode-content">
      <p v-if="episode['publish-at']" class="date mb-1">
        {{ formatDate(episode['publish-at']) }}
      </p>
      <div class="h2 title mb-0 md:mb-4" v-html="episode.title"></div>
      <client-only>
        <episode-tools
          class="hidden md:block"
          :episode="episode"
          @toggleTranscript="onToggleTranscript"
        />
      </client-only>
      <div v-if="imageCredits" class="mt-2 md:mt-3 footer type-body">
        Image credits:
        <v-flexible-link
          class="inline"
          :class="{ raw: !imageCreditsLink }"
          :to="imageCreditsLink"
          >{{ imageCredits }}
        </v-flexible-link>
      </div>
    </div>
  </div>
  <episode-head-skeleton v-else />
  <client-only>
    <episode-tools
      v-if="!pending"
      class="mt-3 block md:hidden"
      :episode="episode"
      @toggleTranscript="onToggleTranscript"
    />
    <episode-tools-skeleton v-else class="mt-3 block md:hidden" />
  </client-only>
</template>

<style lang="scss">
.episode {
  align-items: center;
  position: relative;
  .cms-edit-button {
    position: absolute;
    padding: 0.5rem;
    z-index: 10;
    top: 5px;
    left: 5px;
  }

  .episode-image {
    margin-right: 1.5rem;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;

    @include media('<lg') {
      margin-right: 1rem;
    }

    @include media('<md') {
      margin-right: 0.75rem;
      width: 90px;
      height: 90px;
      border-radius: 20px;
      min-width: 90px;
      min-height: 90px;
    }
  }

  .episode-content {
    flex-grow: 1;

    .date {
      font-size: var(--font-size-5);
      text-transform: uppercase;
      line-height: normal;

      @include media('<md') {
        font-size: var(--font-size-3);
      }
    }

    .title {
      font-size: var(--font-size-12);
      line-height: var(--font-size-13);
      font-weight: 500;

      @include media('<md') {
        font-size: var(--font-size-8);
        line-height: var(--font-size-9);
      }
    }
  }
}
</style>
