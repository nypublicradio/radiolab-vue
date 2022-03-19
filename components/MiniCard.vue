<script setup>
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import LockIcon from '~/components/icons/LockIcon.vue'
const props = defineProps({
  alt: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
  membersOnly: {
    type: Boolean,
    default: false,
  },
  subtitle: {
    type: String,
    default: null,
  },
  tease: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
})
</script>

<template>
    <nuxt-link :to="url" class="mini-card p-4">
        <v-image-with-caption
          :image="image"
          :alt="alt"
          :width="80"
          :height="80"
          class="mini-card-image"
        />
        <div class="mini-card-content">
          <p class="mini-card-subtitle"><lock-icon v-if="membersOnly" /> {{props.subtitle}}</p>
          <h3 v-html="props.title" class="mini-card-title" />
          <p v-html="props.tease" class="mini-card-tease" />
        </div>
    </nuxt-link>
</template>

<style lang="scss">
.mini-card {
    border: 1px solid var(--primary-color);
    border-radius: 20px;
    width: 100%;
    height: 100%;
    text-decoration: none;
    display: flex;
    transition: var(--transition-duration);
    &:hover {
      background: var(--primary-color);
    }
}
.mini-card .image-with-caption {
  width: 100px;
}
.mini-card .mini-card-image .simple-responsive-image-holder .image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 20px;
}
.mini-card .lock-icon {
    float: left;
    margin-right: 8px;
    height: var(--font-size-5);
}
.mini-card .mini-card-subtitle {
    text-transform: uppercase;
    font-size: var(--font-size-5);
    line-height: var(--font-size-5);
}
.mini-card .mini-card-title {
  font-size: var(--font-size-10);
  line-height: 20px;
  margin: 8px 0 16px;
  text-transform: none;
}
.mini-card .mini-card-tease {
    font-size: var(--font-size-5);
    line-height: 20px;
}
</style>
