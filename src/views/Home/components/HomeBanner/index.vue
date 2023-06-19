<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getBannerAPI } from "@/apis/banner";

let bannerList: any = ref([])
let getBanner = async () => {
    let res = await getBannerAPI({ distributionSite: '2' })
    bannerList.value = res.data.result
}
onMounted(() => {
    getBanner()
})

</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>