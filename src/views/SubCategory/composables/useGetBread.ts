//读取不到route

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI } from "@/apis/category";


export let useGetBread = () => {
    let categoryData: any = ref({})
    let route = useRoute()

    let getBread = async () => {
        let res = await getCategoryFilterAPI(route.params.id)
        categoryData.value = res.data.result
        console.log(categoryData.value);
    }
    onMounted(() => {
        getBread()
    })

    return categoryData
}
