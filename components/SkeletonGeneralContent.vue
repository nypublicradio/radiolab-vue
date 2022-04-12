<script setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
    <div>
        <div class="skeleton-general-content flex flex-column">
            <skeleton width="100%" />
            <skeleton width="70%" class="mb-3" />

            <skeleton width="95%" />
            <skeleton width="85%" />
            <skeleton width="100%" height="20rem" />
            <skeleton width="70%" />
            <skeleton width="60%" class="mb-3" />

            <skeleton width="95%" />
            <skeleton width="98%" />
            <skeleton width="100%" />
            <skeleton width="96%" />
            <skeleton width="97%" />
        </div>
    </div>
</template>

<style lang="scss">
.skeleton-general-content {
    gap: 0.75rem;
}
</style>
