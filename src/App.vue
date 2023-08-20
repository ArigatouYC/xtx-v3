<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useCounterStore } from "@/stores/navData";
import axios from 'axios';

let navData = useCounterStore()

onMounted(() => {
  navData.getCategory()

  let res = ref('')
  let test = async function test() {
    res = await axios.get('https://www.fastmock.site/mock/ae0543719133bfde880d4502d1958449/demo/api/test')
    console.log(res);
  }
  test()
})

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
