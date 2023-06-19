import { onMounted, ref } from "vue";
import { getBannerAPI } from "@/apis/banner";

export let useGetBanner = () => {
    let bannerList: any = ref([])

    let getBanner = async () => {
        let res = await getBannerAPI({ distributionSite: '2' })
        bannerList.value = res.data.result
    }

    onMounted(() => { getBanner() })


    return {
        bannerList
    }
}

