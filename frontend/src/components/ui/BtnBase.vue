<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  btnStyle?: 'default' | 'secondary' | 'danger'
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

function handleClick(evt: MouseEvent) {
  if (!props.disabled) emit('click', evt)
}

const btnClass = computed(() => {
  switch (props.btnStyle) {
    case 'secondary':
      return 'btn-secondary'
    case 'danger':
      return 'btn-danger'
    default:
      return 'btn-default'
  }
})
</script>

<template>
  <button
      :class="['btn-base', btnClass]"
      :disabled="props.disabled"
      @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn-base {
  cursor: pointer;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-base:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-default {
  background: linear-gradient(to right, #4f46e5, #6366f1);
  color: #fff;
}

.btn-default:hover:not(:disabled) {
  /* hover без тени */
  background: linear-gradient(to right, #6366f1, #4f46e5);
}

.btn-secondary {
  background: linear-gradient(to right, #7c3aed, #a78bfa);
  color: #fff;
}

.btn-secondary:hover:not(:disabled) {
  background: linear-gradient(to right, #a78bfa, #7c3aed);
}

.btn-danger {
  background: linear-gradient(to right, #f87171, #ef4444);
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  background: linear-gradient(to right, #ef4444, #f87171);
}
</style>
