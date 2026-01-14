<script lang="ts" setup>
import { defineProps } from "vue";
import LiveCodingTaskItem from "./LiveCodingTaskItem.vue";

const props = defineProps<{
  tasks: any[];
}>();
</script>

<template>
  <div class="mt-4 space-y-2">
    <LiveCodingTaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @updated="$emit('task-updated')"
        @removed="$emit('task-removed')"
    />
  </div>
</template>

