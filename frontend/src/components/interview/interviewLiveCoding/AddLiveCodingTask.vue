<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ interviewId: number }>();
const emit = defineEmits(["task-added"]);

const allTasks = ref<any[]>([]);
const selectedTaskId = ref<number | "">("");

async function fetchAllTasks() {
  const { data } = await axios.get("/api/livecoding/tasks");
  allTasks.value = data.items;
}

async function addTask() {
  if (!selectedTaskId.value) return;

  await axios.post("/api/interview-livecoding", {
    interviewId: props.interviewId,
    taskId: selectedTaskId.value
  });

  selectedTaskId.value = "";
  emit("task-added");
}

onMounted(() => {
  fetchAllTasks();
});
</script>


<template>
  <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2">
    <select v-model="selectedTaskId" class="border px-2 py-1 rounded w-full md:w-64">
      <option disabled value="">Выберите задачу</option>
      <option v-for="task in allTasks" :key="task.id" :value="task.id">
        {{ task.title }}
      </option>
    </select>
    <button
        class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        :disabled="!selectedTaskId"
        @click="addTask"
    >
      Добавить к интервью
    </button>
  </div>
</template>
