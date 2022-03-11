<script setup>
//import { ref, computed, onMounted, defineEmit } from "vue"
import VFlexibleLink from 'nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const router = useRouter()
const props = defineProps({
    bp: {
        type: String,
        default: 'md',
    },
})
const routeTo = (page) => {
    router.push(page)
}
const linkTo = (url) => {
    window.open(url, '_blank')
}
//const emit = defineEmit(["change", "click"]);

</script>

<template>
    <div class="become-a-member grid">
        <div :class="`col-12 ${props.bp}:col-8 left`">
            <h2>
                Unlock exclusives in
                <span class="white-space-nowrap">
                    The Lab
                    <span>
                        <img alt="icon" src="/rl-icon.svg" class="icon" />
                    </span>
                </span>
            </h2>
        </div>
        <div :class="`col-12 ${props.bp}:col-4 right`">
            <v-flexible-link to="/" class="link-only">
                <Button label="Become a member" />
            </v-flexible-link>
            <Button @click="routeTo('news')" label="Become a member" />
            <Button @click="linkTo('https://www.google.com')" label="Become a member" />
        </div>
    </div>
</template>

<style lang="scss">
.become-a-member {
    .left {
        .icon {
            width: 45px;
            height: auto;
            vertical-align: middle;
        }
    }
    .right {
    }
}
</style>
