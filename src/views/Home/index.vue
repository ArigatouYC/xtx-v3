<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
</template>

<script lang="ts" setup>
import HomeCategory from '@/views/Home/components/HomeCategory/index.vue'
import HomeBanner from '@/views/Home/components/HomeBanner/index.vue'
import HomeHot from '@/views/Home/components/HomeHot/index.vue'
import HomeProduct from '@/views/Home/components/HomeProduct/index.vue'
import HomeNew from '@/views/Home/components/HomeNew/index.vue'

</script>

<style lang="scss" scoped></style>