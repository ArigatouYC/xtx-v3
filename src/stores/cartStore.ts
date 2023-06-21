import { defineStore } from "pinia";
import { ref } from "vue";

export let usecartStore = defineStore('cartStore', () => {

    let cartList: any = ref([])

    let addCart = (goods: any) => {
        //在cartList中招有没有要当前要添加购物车的商品的skuid，如果有，数量加1，否则push
        let item: any = cartList.value.find((item: any) => {
            return goods.skuId === item.skuId
        })
        if (item) {
            item.count++
        } else {
            cartList.value.push(goods)
        }
    }

    return {
        cartList,
        addCart
    }
},
    {
        persist: true,
    }
)