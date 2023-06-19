import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('navData', () => {

    let listArr: any = ref([])

    let getCategory = async () => {
        let res = await getCategoryAPI()
        listArr.value = res.data.result
    }

    return {
        listArr,
        getCategory
    }
})


