<script lang="ts" setup>
import { gethHotGoodsAPI } from "@/apis/detail";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let hotList: any = ref([])

let route = useRoute()

let props = defineProps({
    hotType: {
        type: Number,
    }
})
let ENMTYPE = {
    1: "24小时热榜",
    2: "本周热榜"
}
let title = computed(() => {
    //??????????
    // @ts-ignore
    return ENMTYPE[props.hotType]
})

let reqHotData: any = {
    id: route.params.id,
    type: props.hotType,
}
let gethHotGoods = async () => {
    let res = await gethHotGoodsAPI(reqHotData)
    hotList.value = res.data.result
}

onMounted(() => {
    gethHotGoods()
})

</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: #DB562E;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: orange;
            font-size: 20px;
        }
    }
}
</style>