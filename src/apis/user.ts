import httpInstance from '@/utils/http'


export const loginAPI = ({ account, password }: any) => {
    return httpInstance({
        method: 'POST',
        url: '/login',
        data: {
            account,
            password
        }
    })
}