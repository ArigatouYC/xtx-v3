import axios from 'axios'

import { useUserStore } from "@/stores/userStore";

import router from '@/router'


const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

httpInstance.interceptors.request.use(config => {

    let userStore: any = useUserStore()
    //外部声明报错??
    let token = userStore.userInfo.token
    //让请求头携带token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
    (e) => { Promise.reject(e) })


httpInstance.interceptors.response.use(
    // 在这里定义成功响应的处理逻辑
    (response) => {
        return response // 必须返回响应对象，否则下一个 then 将无法拿到 response 参数
    },
    // 在这里定义失败响应的处理逻辑
    (error) => {
        let userStore: any = useUserStore()
        ElNotification({
            type: 'warning',
            title: '请检查',
            message: error.response.data.message,
            duration: 2000
        })

        if (error.response.status === 401) {
            userStore.clearUserInfo()
            router.push('/login')
        }

        return Promise.reject(error) // 必须返回一个拒绝的 Promise，否则下一个 then 将无法拿到 error 参数
    },


);

export default httpInstance