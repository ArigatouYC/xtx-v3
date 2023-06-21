import httpInstance from '@/utils/http'


export const getDetailAPI = (id: any) => {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}

//  param {Number} id - 商品id
//  param {Number} type - 1代表24小时热销榜 2代表周热销榜
//  param {Number} limit - 获取个数

export const gethHotGoodsAPI = ({ id = '', type = 1, limit = 3 }) => {
    return httpInstance({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit
        }
    })
}