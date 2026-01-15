<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'danger'
}>()

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const btnClass = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
    default:
      return 'bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'
  }
})

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <button :class="btnClass" @click="handleClick">
    <slot />
  </button>
</template>
