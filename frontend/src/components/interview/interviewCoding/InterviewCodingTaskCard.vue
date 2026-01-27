<script setup lang="ts">
import { InterviewCodingTask } from "../../../types/interview-coding.types";
import { useInterviewCodingStore } from "../../../stores/useInterviewCodingStore";
import BtnBase from "../../ui/BtnBase.vue";

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
  <div class="task-card flex flex-col gap-2 p-4">
    <h3 class="task-card__title">{{ task.template.title }}</h3>
    <p class="task-card__description">{{ task.template.description }}</p>

    <div class="task-card__actions flex gap-2 mt-2">
      <BtnBase btnStyle="default" @click="open">Лайвкодинг</BtnBase>
      <BtnBase btnStyle="danger" @click="remove">Удалить</BtnBase>
    </div>

    <small class="task-card__status" v-if="task.completed">Решено</small>
  </div>
</template>

<style scoped>
.task-card {
  border: 1px solid rgba(120, 130, 255, 0.2);
  border-radius: 8px;
  background: linear-gradient(145deg, #0f0f2f, #1b1b45);
  min-width: 0;
}

.task-card__title {
  font-weight: 600;
  color: #f0f0ff;
}

.task-card__description {
  color: #d0d0ff;
  font-size: 14px;
}

.task-card__status {
  color: #4ade80;
  font-size: 12px;
}

@media (max-width: 640px) {
  .task-card__actions {
    flex-direction: column;
  }
}
</style>
