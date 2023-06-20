import { onMounted, ref } from "vue";
import { getBannerAPI } from "@/apis/banner";

export const useGetBanner = () => {
    const bannerList: any = ref([])

    const getBanner = async () => {
        const res = await getBannerAPI({ distributionSite: '2' })
        bannerList.value = res.data.result
    }

    onMounted(() => { getBanner() })


    return {
        bannerList
    }
}

