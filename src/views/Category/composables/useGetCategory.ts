import { ref } from "vue";
import { getTopCategoryAPI } from '@/apis/getTopCategory'
import { useRoute, onBeforeRouteUpdate } from "vue-router";


export let useGetCategory = () => {
    let categoryData: any = ref({})
    let route = useRoute()

    let getCategory = async (id = route.params.id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        let res: any = await getTopCategoryAPI(id)
        categoryData.value = res.data.result
    }

    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}

