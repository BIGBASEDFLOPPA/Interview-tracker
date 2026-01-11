<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useRouter } from 'vue-router';
import {useAuthStore} from "../stores/useAuthStore";


export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const auth = useAuthStore();
    const router = useRouter();

    const onSubmit = async () => {
      await auth.login(email.value, password.value);
      if (auth.isAuthenticated) {
        router.push('/dashboard');
      }
    };

    return {
      email,
      password,
      onSubmit,
      error: auth.error,
      isLoading: auth.isLoading,
    };
  },
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
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
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>


<style scoped>

</style>
