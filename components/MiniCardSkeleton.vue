<script setup>

const props = defineProps({
    rowCount: {
        type: Number,
        default: 4,
    },
    header: {
        type: String,
        default: false,
    },
    buttonText: {
        type: String,
        default: false,
    },

})

</script>

<template>
    <div class="mini-card-skeleton">
        <div class="grid">
            <div
                v-for="index in props.rowCount - 1"
                :key="index"
                class="col-12 xl:col-4 mb-2"
                :class="{ 'xl:hidden': rowCount % 2 && index === props.rowCount - 1 }"
            >
                <skeleton class="card" width="100%" />
                <!-- height="527px" -->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mini-card-skeleton .grid .p-skeleton {
    border-radius: 20px;
}
.mini-card-skeleton .card {
    @include media("<xl") {
        height: 136px !important;
    }
    @include media(">xl") {
        height: 192px !important;
    }
    @include media("<sm") {
        height: 192px !important;
    }
}
</style>
