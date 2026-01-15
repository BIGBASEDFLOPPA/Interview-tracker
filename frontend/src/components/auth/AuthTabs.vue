<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{ tab?: 'login' | 'register' }>();
const emit = defineEmits<{ (e: 'update:tab', tab: 'login' | 'register'): void }>();

const activeTab = ref<'login' | 'register'>(props.tab ?? 'login');

function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab;
  emit('update:tab', tab);
}
</script>

<template>
  <div class="bg-gray-800/70 rounded-xl shadow-md p-3 flex justify-center gap-4 backdrop-blur-sm border border-gray-700">
    <button
        :class="['px-5 py-2 rounded-lg font-semibold transition-colors duration-200',
               activeTab === 'login' ? 'bg-blue-600 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-gray-700/50']"
        @click="switchTab('login')"
    >
      Login
    </button>
    <button
        :class="['px-5 py-2 rounded-lg font-semibold transition-colors duration-200',
               activeTab === 'register' ? 'bg-fuchsia-600 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-gray-700/50']"
        @click="switchTab('register')"
    >
      Register
    </button>
  </div>
</template>
