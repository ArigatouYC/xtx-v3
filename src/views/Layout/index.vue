<template>
    <div>
        <Nav></Nav>
        <LayoutSticky></LayoutSticky>
        <Header></Header>

        <RouterView />

        <Footer></Footer>
    </div>
</template>

<script lang="ts" setup>
import LayoutSticky from "@/views/Layout/components/LayoutSticky/index.vue";
import Nav from "@/views/Layout/components/Nav/index.vue";
import Header from "@/views/Layout/components/Header/index.vue";
import Footer from "@/views/Layout/components/Footer/index.vue";
</script>

<style lang="scss" scoped></style>