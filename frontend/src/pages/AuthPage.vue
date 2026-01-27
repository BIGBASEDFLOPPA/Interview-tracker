<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
import BackgroundStars from "../components/ui/BackgroundStars.vue";
import AuthTabs from "../components/auth/AuthTabs.vue";
import AuthForm from "../components/auth/AuthForm.vue";
import BackgroundVideo from "../components/ui/BackgroundVideo.vue";

const activeTab = ref<'login' | 'register'>('login');
const auth = useAuthStore();
const router = useRouter();
const formFields = ref<string[]>(['email', 'password']);

function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab;
  formFields.value = tab === 'login' ? ['email', 'password'] : ['name', 'email', 'password'];
}

const formData = ref({ name: '', email: '', password: '' });
const isLoading = ref(false);
const error = ref<string | null>(null);

async function onSubmit() {
  isLoading.value = true;
  error.value = null;

  try {
    if (activeTab.value === 'login') {
      await auth.login(formData.value.email, formData.value.password);
    } else {
      await auth.register(formData.value.email, formData.value.password, formData.value.name);
    }
    if (auth.isAuthenticated) router.push('/interviews');
  } catch (e: any) {
    error.value = e?.message ?? 'error';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
    <BackgroundVideo class="hidden md:block" />
    <BackgroundStars class="block md:hidden" />
    <div class="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-gray-900/85 border border-gray-700 shadow-2xl">
      <AuthTabs :activeTab="activeTab" @update:tab="switchTab" />
      <div class="mt-8">
        <AuthForm
            :fields="formFields"
            v-model:data="formData"
            :isLoading="isLoading"
            :error="error"
            @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>
<style>

</style>