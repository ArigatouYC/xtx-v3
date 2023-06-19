import httpInstance from '@/utils/http'


export const getTopCategoryAPI = (id: any) => {
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })
}