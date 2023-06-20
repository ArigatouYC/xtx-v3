import http from '@/utils/http'


export const testFun = () => {
    return http({
        url: 'home/category/head'
    })
}
