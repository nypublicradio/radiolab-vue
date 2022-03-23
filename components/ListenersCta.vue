<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import ArrowRight from '~/components/icons/ArrowRight.vue'
</script>

<template>
  <div class="listeners-cta p-5">
    <h2>Listeners</h2>
    <div class="text-right">
        <v-flexible-link to="/read-the-credits">
            Read The Credits <arrow-right />
        </v-flexible-link>
        <v-flexible-link to="/pitch-us">
            Pitch Us <arrow-right />
        </v-flexible-link>
    </div>
  </div>
</template>

<style lang="scss">
.listeners-cta {
    position: relative;
    background: #EDC314;
    min-height: 433px;
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    &:after{
        content: '';
        position: absolute;
        left: -250px;
        top: -750px;
        width: 1060px;
        background: linear-gradient(180deg, #F4A800 0%, #F4A800 70%, #F9B0D4 100%);
        height: 900px;
        border-radius: 0 0 70% 70%;
    }
}
.listeners-cta h2,
.listeners-cta .flexible-link {
    z-index: 1;
    font-size: var(--font-size-14);
    line-height: 48px;
    letter-spacing: 0.1em;
    color: var(--white100);
    text-decoration: none;
    text-transform: uppercase;
}
.listeners-cta .flexible-link {
    display: block;
    width: 100%;
    border-top: solid 2px var(--white100);
    padding: 20px 0;
    &:hover {
        color: var(--white300) !important;
        text-decoration: none;
        circle,
        path {
            stroke: var(--white300);
        }
        path {
            fill: var(--white300);
        }
    }
}
</style>