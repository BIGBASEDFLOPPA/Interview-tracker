<script setup lang="ts">


import {useRouter} from 'vue-router';
import {useAuthStore} from "../stores/useAuthStore";
import {ref} from "vue";


const name = ref('');
const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();

const onSubmit = async () => {
  await auth.register(email.value, password.value, name.value);
  if (auth.isAuthenticated) {
    router.push('/dashboard');
  }
};


</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
              v-model="name"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
              v-model="email"
              type="email"
              class="w-full border rounded px-3 py-2"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              class="w-full border rounded px-3 py-2"
              required
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
