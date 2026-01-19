<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  authStore.logoutLocal();
  router.push({ path: '/auth' });
  try {
    await authStore.logout();
  } catch {}
}
</script>

<template>
  <header class="h-14 border-b flex items-center px-4">
    <button
        v-if="route.meta.showBackToInterviews"
        class="text-blue-500 mr-3"
        @click="router.push({ name: 'interviews' })"
    >
      Вернуться списку интервью
    </button>

    <button
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        class="ml-auto text-red-500"
    >
      Выйти
    </button>

    <h1 class="font-bold ml-4">Тут хедер типо</h1>
  </header>
</template>
