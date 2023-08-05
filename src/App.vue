<script setup lang="ts">

import { onMounted } from 'vue'
import { useCounterStore } from "@/stores/navData";

let navData = useCounterStore()

onMounted(() => {
  navData.getCategory()
})

</script>

<template>
  <RouterView />

</template>

<style scoped></style>
