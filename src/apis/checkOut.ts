import request from '@/utils/http'


// 获取详情接口
export const getCheckInfoAPI = () => {
    return request({
        url: '/member/order/pre'
    })
}


// 创建订单
export const createOrderAPI = (data: any) => {
    return request({
        url: '/member/order',
        method: 'POST',
        data
    })
}