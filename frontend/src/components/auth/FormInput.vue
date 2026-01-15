<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ label: string; modelValue: string; type?: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>();

function updateValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex flex-col">
    <label class="mb-2 text-sm font-medium text-gray-300">{{ label }}</label>
    <input
        :type="type ?? 'text'"
        :value="modelValue"
        @input="updateValue"
        class="px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
             transition-shadow duration-200 shadow-sm hover:shadow-md"
        required
    />
  </div>
</template>
