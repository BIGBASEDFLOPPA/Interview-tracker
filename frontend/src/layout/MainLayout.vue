<script setup lang="ts">
import { onMounted } from 'vue'
import {useAuthStore} from "../stores/useAuthStore";



const auth = useAuthStore()

onMounted(() => {
  if (!auth.currentUser && auth.isAuthenticated) {
    auth.fetchCurrentUser()
  }
})
</script>

<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-gray-800 text-white p-4">
      <h2 class="text-xl font-bold mb-4">Interview Tracker</h2>
      <nav>
        <ul>
          <li class="mb-2"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="mb-2"><router-link to="/theory">Theory</router-link></li>
          <li class="mb-2"><router-link to="/livecoding">Livecoding</router-link></li>
          <li class="mb-2"><router-link to="/interviews">Interviews</router-link></li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">Welcome, {{ auth.currentUser?.name || 'User' }}!</h1>
        </div>
        <button class="px-4 py-2 bg-red-500 text-white rounded" @click="auth.logout">
          Logout
        </button>
      </header>
      <router-view />
    </main>
  </div>
</template>
