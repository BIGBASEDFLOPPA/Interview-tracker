<script setup lang="ts">
import { computed } from 'vue'



const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <button class="w-100" @click="handleClick">
    <slot />
  </button>
</template>
