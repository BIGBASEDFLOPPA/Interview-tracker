<script setup lang="ts">
import { Interview } from "../../types/interview.types";

defineProps<{
  interviews: Interview[];
}>();

const emit = defineEmits<{
  (e: "select", interview: Interview): void;
}>();

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function statusClass(status: string) {
  switch (status) {
    case "PLANNED":
      return "bg-yellow-500";
    case "PASSED":
      return "bg-green-500";
    case "FAILED":
      return "bg-red-500";
    case "FAKE":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}

</script>

<template>
  <div class="space-y-2">
    <div
        v-for="interview in interviews"
        :key="interview.id"
        class="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer flex justify-between items-center"
        @click="emit('select', interview)"
    >
      <div>
        <p class="font-semibold">{{ interview.title }}</p>
        <p class="text-gray-600">{{ interview.company }}</p>
        <p class="text-sm text-gray-400">{{ formatDate(interview.date) }}</p>
      </div>

      <span
          :class="statusClass(interview.status)"
          class="px-2 py-1 rounded text-white text-sm"
      >
        {{ interview.status }}
      </span>
    </div>
  </div>
</template>
