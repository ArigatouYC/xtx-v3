import httpInstance from "@/utils/http"

export const getCategoryFilterAPI = (id: any) => {
    return httpInstance({
        url: '/category/sub/filter',
        params: {
            id
        }
    })
}


//  data { 
//      categoryId: 1005000 ,
//      page: 1,
//      pageSize: 20,
//      sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
//    } 
export const getSubCategoryAPI = (data: any) => {
    return httpInstance({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}