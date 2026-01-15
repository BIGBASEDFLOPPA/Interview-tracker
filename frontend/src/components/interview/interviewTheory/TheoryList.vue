<script lang="ts" setup>
import { defineProps } from "vue";
import TheoryItem from "./TheoryItem.vue";

const props = defineProps<{ items: any[] }>();
const emit = defineEmits<{
  (e: 'update', payload: { id: number; learned: boolean }): void;
  (e: 'remove', id: number): void;
}>();
</script>

<template>
  <div class="space-y-2">
    <TheoryItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update="$emit('update', $event)"
        @remove="$emit('remove', $event)"
    />
  </div>
</template>

