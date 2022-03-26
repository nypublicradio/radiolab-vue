<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
    <div>
        <div class="episode-body-text-skeleton flex flex-column">
            <skeleton width="100%" />
            <skeleton width="70%" class="mb-3" />

            <skeleton width="95%" />
            <skeleton width="85%" />
            <skeleton width="100%" />
            <skeleton width="70%" />
            <skeleton width="60%" class="mb-3" />

            <skeleton width="95%" />
            <skeleton width="85%" />
            <skeleton width="100%" />
            <skeleton width="70%" />
            <skeleton width="60%" />
        </div>
    </div>
</template>

<style lang="scss">
.episode-body-text-skeleton {
    gap: 0.75rem;
}
</style>
