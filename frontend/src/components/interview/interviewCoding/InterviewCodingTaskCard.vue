<script setup lang="ts">


import {InterviewCodingTask} from "../../../types/interview-coding.types";
import {useInterviewCodingStore} from "../../../stores/useInterviewCodingStore";

const props = defineProps<{
  task: InterviewCodingTask;
}>();

const store = useInterviewCodingStore();

function open() {
  store.openTask(props.task);
}

async function remove() {
  if (!confirm("Удалить задачу из интервью?")) return;
  await store.removeTask(props.task.id);
}
</script>

<template>
  <div class="task">
    <h3>{{ task.template.title }}</h3>
    <p>{{ task.template.description }}</p>

    <div class="actions">
      <button @click="open">Лайвкодинг</button>
      <button @click="remove">Удалить</button>
    </div>

    <small v-if="task.completed">Решено</small>
  </div>
</template>

<style scoped>
.task {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
