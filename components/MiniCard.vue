<script setup>
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
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
  <div class="mini-card p-4">
    <v-image-with-caption
      :image="image"
      :alt="alt"
      :imageUrl="url"
      :width="320"
      :height="240"
      :ratio="[1, 1]"
      :sizes="[1]"
      class="mini-card-image"
    />
    <div class="mini-card-content">
      <p class="mini-card-subtitle">
        <lock-icon v-if="membersOnly" />
        {{ props.subtitle }}
      </p>
      <v-flexible-link :to="url">
        <div v-html="props.title" class="h3 mini-card-title"></div>
      </v-flexible-link>
      <div
        v-html="props.tease"
        class="html-formatting type-body mini-card-tease"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
.mini-card {
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
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
.mini-card .flexible-link {
  text-decoration: none;
  .mini-card-title {
    @include truncate();
    @include t2lines();
    font-size: var(--font-size-10);
    font-weight: var(--font-weight-500);
    line-height: 28px;
    margin: 8px 0 16px;
  }
}
.mini-card .mini-card-tease {
  font-size: var(--font-size-5);
  line-height: var(--font-size-8);
  @include truncate();
  @include t3lines();
}
</style>
