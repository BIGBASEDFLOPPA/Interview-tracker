<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import FormInput from './FormInput.vue';
import BtnBase from "../ui/BtnBase.vue";

const props = defineProps<{
  fields?: string[];
  data?: Record<string, string>;
  isLoading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{ (e: 'update:data', val: Record<string, string>): void; (e: 'submit'): void }>();

function updateField(key: string, value: string) {
  emit('update:data', { ...(props.data ?? {}), [key]: value });
}

function handleSubmit() {
  emit('submit');
}

const isRegister = computed(() => props.fields?.includes('name'));
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <FormInput
        v-for="field in props.fields ?? []"
        :key="field"
        :label="field.charAt(0).toUpperCase() + field.slice(1)"
        :type="field === 'password' ? 'password' : 'text'"
        :modelValue="props.data?.[field] ?? ''"
        @update:modelValue="val => updateField(field, val)"
    />

    <div v-if="props.error" class="text-red-400 text-sm font-medium animate-pulse">{{ props.error }}</div>

    <BtnBase
        type="submit"
        :disabled="props.isLoading"
        class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
             transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
    >
      {{ props.isLoading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login') }}
    </BtnBase>
  </form>
</template>
