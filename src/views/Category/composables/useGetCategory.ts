import { ref, onMounted } from "vue";
import { getTopCategoryAPI } from '@/apis/getTopCategory'
import { useRoute, onBeforeRouteUpdate } from "vue-router";


//这个很重要
export const useGetCategory = () => {
    const categoryData: any = ref({})
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res: any = await getTopCategoryAPI(id)
        categoryData.value = res.data.result
    }


    onMounted(() => {
        getCategory()
    })

    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}

