<script lang="ts" setup>
import { ref, watch } from "vue";
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ task: any }>();
const emit = defineEmits(["updated", "removed"]);

const solution = ref(props.task.solution || "");
const completed = ref(props.task.completed || false);

watch(() => props.task, (newTask) => {
  solution.value = newTask.solution || "";
  completed.value = newTask.completed || false;
});

async function save() {
  await axios.put(`/api/interview-livecoding/${props.task.id}`, {
    solution: solution.value,
    completed: completed.value
  });
  emit("updated");
}

async function removeTask() {
  await axios.delete(`/api/interview-livecoding/${props.task.id}`);
  emit("removed");
}
</script>

<template>
  <div class="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
    <div>
      <h3 class="font-semibold">{{ task.task.title }}</h3>
      <p class="text-gray-600">{{ task.task.description }}</p>
      <p class="text-sm text-gray-400 mt-1">Tags: {{ task.task.tags.join(", ") }}</p>
    </div>

    <div class="mt-2 md:mt-0 flex items-center gap-2">
      <input
          type="text"
          v-model="solution"
          placeholder="Ваше решение"
          class="border rounded px-2 py-1 w-64"
      />
      <label class="flex items-center gap-1">
        <input type="checkbox" v-model="completed" />
        Выполнено
      </label>
      <button
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          @click="save"
      >
        Сохранить
      </button>
      <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          @click="removeTask"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
