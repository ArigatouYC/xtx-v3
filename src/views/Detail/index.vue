<script lang="ts" setup>
import { getDetailAPI } from "@/apis/detail";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailHot from '@/views/Detail/components/DetailHot/index.vue'

import { useCartStore } from "@/stores/cartStore";


let detailList: any = ref({})
let route = useRoute()

let GetDetail = async () => {
    let res = await getDetailAPI(route.params.id)
    detailList.value = res.data.result
}

onMounted(() => {
    GetDetail()
})

let skuObj: any = ref({})

let skuChange = (sku: any) => {
    // console.log(sku);
    skuObj = sku
}

let count = ref(1)

let countChange = () => {
    // console.log(count.value);
}

let cartStore = useCartStore()

let addCart = () => {
    // skuObj是ref，单被sku赋值的时候被覆盖，所以访问skuObj不用.value
    if (skuObj.skuId) {
        cartStore.addCart({
            id: detailList.value.id,
            name: detailList.value.name,
            picture: detailList.value.mainPictures[0],
            price: detailList.value.price,
            count: count.value,
            skuId: skuObj.skuId,
            attrsText: skuObj.specsText,
            selected: true
        })
    } else {
        ElMessage({
            type: 'warning',
            message: '请先选择商品规格'
        })
    }
}

</script>

<template>
    <!-- 加v-if防止报错，
        报错原因，数据为获取到前模板就读取数据，拿到undefine。
        加v-if等数据拿到才渲染
     -->
    <div class="xtx-goods-page" v-if="detailList.categories">
        <div class="container">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `'/categories/${detailList.categories[1].id}'` }">{{
                        detailList.categories[1].name }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `'/categories/${detailList.categories[0].id}'` }">{{
                        detailList.categories[0].name }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detailList.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <ImageView :imageList="detailList.mainPictures"></ImageView>
                            <!-- 统计数量 -->
                            <ul class="goods-sales">
                                <li>
                                    <p>销量人气</p>
                                    <p> {{ detailList.salesCount }} </p>
                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>商品评价</p>
                                    <p>{{ detailList.commentCount }}</p>
                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏人气</p>
                                    <p>{{ detailList.collectCount }}</p>
                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>品牌信息</p>
                                    <p>{{ detailList.brand.name }}</p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                                </li>
                            </ul>
                        </div>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name">{{ detailList.name }}</p>
                            <p class="g-desc">{{ detailList.desc }} </p>
                            <p class="g-price">
                                <span>{{ detailList.price }}</span>
                                <span> {{ detailList.oldPrice }}</span>
                            </p>
                            <div class="g-service">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>好物放送，App领券购买直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>无忧退货</span>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                            <!-- sku组件 -->
                            <Sku :goods="detailList" @change="skuChange"></Sku>
                            <!-- 数据组件 -->

                            <!-- 按钮组件 -->

                            <el-input-number v-model="count" :min="1" :max="99" @change="countChange" />

                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                        </div>
                    </div>
                    <div class="goods-footer">
                        <div class="goods-article">
                            <!-- 商品详情 -->
                            <div class="goods-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="goods-detail">
                                    <!-- 属性 -->
                                    <ul class="attrs">
                                        <li v-for="item in detailList.details.properties" :key="item.value">
                                            <span class="dt">{{ item.name }}</span>
                                            <span class="dd">{{ item.value }}</span>
                                        </li>
                                    </ul>
                                    <!-- 图片 -->
                                    <img v-for="img in detailList.details.pictures" :key="img" :src="img" alt="">

                                </div>
                            </div>
                        </div>
                        <!-- 24热榜+专题推荐 -->
                        <div class="goods-aside">
                            <DetailHot :hotType="1"></DetailHot>
                            <DetailHot :hotType="2"></DetailHot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: orange;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: skyblue;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: skyblue;
                    }
                }
            }
        }
    }

    .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: orange;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: skyblue;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: skyblue;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: orange;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;

}

.bread-container {
    padding: 25px 0;
}
</style>