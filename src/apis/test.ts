import httpInstance from '@/utils/http'


export const testFun = () => {
    return httpInstance({
        url: 'home/category/head'
    })
}
