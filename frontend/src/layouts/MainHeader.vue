<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

function goToInterviews() {
  router.push({ name: "interviews" });
}
</script>

<template>
  <header class="h-14 border-b flex items-center px-4">
    <button
        v-if="route.meta.showBackToInterviews"
        class="text-blue-500 mr-3"
        @click="goToInterviews"
    >
      Вернуться списку интервью
    </button>

    <h1 class="font-bold">Тут хедер типо</h1>
  </header>
</template>
