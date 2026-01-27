<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import { computed } from "vue";
import {useAuthStore} from "../../stores/useAuthStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Выход
async function handleLogout() {
  authStore.logoutLocal();
  router.push({ path: '/auth' });
  try { await authStore.logout(); } catch {}
}

// Показывать кнопку "Вернуться" только на theory/livecoding
const showBackButton = computed(() => route.meta.showBackToInterviews === true);
</script>

<template>
  <header class="h-14 flex items-center px-4 bg-black/30 backdrop-blur-md border-b border-gray-800">
    <!-- Кнопка "Вернуться" -->
    <button
        v-if="showBackButton"
        class="text-blue-400 hover:text-blue-600 mr-3 transition-colors"
        @click="router.push({ name: 'interviews' })"
    >
      ← Вернуться списку интервью
    </button>

    <h1 class="font-bold text-white ml-4">Interview Tracker</h1>

    <!-- Кнопка "Выйти" -->
    <button
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        class="ml-auto text-red-400 hover:text-red-600 transition-colors"
    >
      Выйти
    </button>
  </header>
</template>
