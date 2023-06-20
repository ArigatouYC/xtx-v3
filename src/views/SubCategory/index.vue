<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import GoodsItem from '@/views/Home/components/HomeProduct/components/GoodsItem/index.vue'

//获取面包屑导航
let categoryData: any = ref({})
let route = useRoute()

let getBread = async () => {
    let res = await getCategoryFilterAPI(route.params.id)
    categoryData.value = res.data.result
}

//获取商品列表
let goodsList: any = ref([])

let reqData = ref({
    categoryId: 1005000,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})

let getGoodsList = async () => {
    let res = await getSubCategoryAPI(reqData)
    goodsList.value = res.data.result.items
}

onMounted(() => {
    getBread()
    getGoodsList()
})

//但tab栏变化时触发
let tabChange = () => {
    reqData.value.page = 1
    getGoodsList()
}

//触底加载
let disable = ref(false)
let load = async () => {
    reqData.value.page++
    let res = await getSubCategoryAPI(reqData)
    //新老拼接
    goodsList.value = [...goodsList.value, ...res.data.result.items]
    if (res.data.result.items.length === 0) {
        disable.value = true
        console.log("没数据了");
    }
}

</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="sub-container">
            <el-tabs type="card" v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <!-- 在要实现滚动加载的列表上上添加v-infinite-scroll，
                并赋值相应的加载方法，
                可实现滚动到底部时自动执行加载方法。
             -->
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disable">
                <!-- 商品列表-->
                <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"></GoodsItem>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

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

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>