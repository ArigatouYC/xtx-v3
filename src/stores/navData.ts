import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('navData', () => {

    const listArr: any = ref([])

    const getCategory = async () => {
        const res = await getCategoryAPI()
        listArr.value = res.data.result
    }

    return {
        listArr,
        getCategory
    }
})


