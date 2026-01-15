<template>
    <MainHeader v-if="!route.meta.hideHeader" />
    <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import MainHeader from "./layouts/MainHeader.vue";

const route = useRoute();
</script>
<style>


</style>