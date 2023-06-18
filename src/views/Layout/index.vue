<template>
    <div>
        <Nav></Nav>
        <Header></Header>
        <RouterView />
        <Footer></Footer>
    </div>
</template>

<script lang="ts" setup>
import Nav from "@/views/Layout/components/Nav/index.vue";
import Header from "@/views/Layout/components/Header/index.vue";
import Footer from "@/views/Layout/components/Footer/index.vue";
</script>

<style lang="scss" scoped></style>