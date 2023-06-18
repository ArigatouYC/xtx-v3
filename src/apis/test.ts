import http from '@/utils/http'


export let testFun = () => {
    return http({
        url: 'home/category/head'
    })
}
