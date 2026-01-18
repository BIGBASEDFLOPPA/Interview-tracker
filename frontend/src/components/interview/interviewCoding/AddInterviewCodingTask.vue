<script setup lang="ts">
import { ref } from "vue";
import { useInterviewCodingStore } from "../../../stores/useInterviewCodingStore";

const props = defineProps<{
  interviewId: number;
}>();

const liveCodingStore = useInterviewCodingStore();

const title = ref("");
const description = ref("");
const tagsInput = ref("");
const loading = ref(false);

async function handleAdd() {
  if (!title.value.trim() || !description.value.trim()) return;

  loading.value = true;
  try {
    const tags = tagsInput.value
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0);

    await liveCodingStore.addTask(props.interviewId, {
      title: title.value,
      description: description.value,
      tags,
    });

    title.value = "";
    description.value = "";
    tagsInput.value = "";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="add-task">
    <h3>Добавить новую задачу</h3>
    <input
        v-model="title"
        type="text"
        placeholder="Название задачи"
    />
    <textarea
        v-model="description"
        placeholder="Описание задачи"
    ></textarea>
    <input
        v-model="tagsInput"
        type="text"
        placeholder="Теги (через запятую)"
    />
    <button @click="handleAdd" :disabled="loading">
      {{ loading ? "Сохранить" : "Добавить задачу" }}
    </button>
  </div>
</template>

<style scoped>
.add-task {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-task input,
.add-task textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.add-task button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.add-task button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.add-task button:hover:not(:disabled) {
  background-color: #2563eb;
}
</style>
