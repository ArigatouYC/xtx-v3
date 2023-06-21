//读取不到route

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI } from "@/apis/category";


export const useGetBread = () => {
    const categoryData: any = ref({})
    const route = useRoute()

    const getBread = async () => {
        const res = await getCategoryFilterAPI(route.params.id)
        categoryData.value = res.data.result
    }
    onMounted(() => {
        getBread()
    })

    return categoryData
}