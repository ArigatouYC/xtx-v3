// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore: any = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList: any = ref([])
    // 获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.data.result
    }
    // 2. 定义action - addCart
    const addCart = async (goods: any) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的加入购车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            // 添加购物车操作
            // 已添加过 - count + 1
            // 没有添加过 - 直接push
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
            const item: any = cartList.value.find((item: any) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }
    }

    // 删除购物车
    const delCart = async (skuId: any) => {
        if (isLogin.value) {
            // 调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            updateNewList()
        } else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item: any) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 单选功能
    const singleCheck = (skuId: any, selected: any) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item: any) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected: any) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach((item: any) => item.selected = selected)
    }

    // 计算属性
    // 1. 总的数量 所有项的count之和
    const totalCount = computed(() => cartList.value.reduce((a: any, c: any) => a + c.count, 0))
    // 2. 总价 所有项的count*price之和
    const totalPrice = computed(() => cartList.value.reduce((a: any, c: any) => a + c.count * c.price, 0))

    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter((item: any) => item.selected).reduce((a: any, c: any) => a + c.count, 0))
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter((item: any) => item.selected).reduce((a: any, c: any) => a + c.count * c.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item: any) => item.selected))

    return {
        cartList,
        totalCount,
        totalPrice,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        updateNewList
    }
}, {
    persist: true,
})