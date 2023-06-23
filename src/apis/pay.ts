import request from '@/utils/http'

export const getOrderAPI = (id: any) => {
    return request({
        url: `/member/order/${id}`
    })
}