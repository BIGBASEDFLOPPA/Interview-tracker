<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useInterviewCodingStore } from "../stores/useInterviewCodingStore";
import InterviewCodingTaskCard from "../components/interview/interviewCoding/InterviewCodingTaskCard.vue";
import InterviewCodingEditor from "../components/interview/interviewCoding/InterviewCodingEditor.vue";
import AddInterviewCodingTask from "../components/interview/interviewCoding/AddInterviewCodingTask.vue";
import { InterviewCodingTask } from "../types/interview-coding.types";
import InterviewHeaderTabs from "../components/interview/InterviewHeaderTabs.vue";
import BtnBase from "../components/ui/BtnBase.vue";


const liveCodingStore = useInterviewCodingStore();
const route = useRoute();

const tasks = computed<InterviewCodingTask[]>(() => liveCodingStore.tasks);
const activeTask = computed<InterviewCodingTask | null>(() => liveCodingStore.activeTask);
const interviewId = Number(route.params.id);
const solution = ref("");

watch(activeTask, task => {
  solution.value = task?.solution ?? "";
}, { immediate: true });

async function save() {
  if (!activeTask.value) return;
  await liveCodingStore.updateTask(activeTask.value.id, { solution: solution.value, completed: true });
  liveCodingStore.closeTask();
}

function closeEditor() {
  liveCodingStore.closeTask();
}

onMounted(() => {
  liveCodingStore.loadTasks(interviewId);
});
</script>

<template>
  <div class="page flex flex-col gap-4 p-4 min-h-screen">
    <InterviewHeaderTabs :interview="interviewId" />

    <div class="content flex gap-6">
      <aside class="tasks flex flex-col gap-3 w-[35%]">
        <AddInterviewCodingTask :interview-id="interviewId" class="tasks__add mb-3" />
        <div class="tasks__list flex flex-col gap-2">
          <InterviewCodingTaskCard v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </aside>

      <section class="editor-wrapper flex flex-col gap-3 w-[65%]" v-if="activeTask">
        <div class="editor-wrapper__header flex justify-between items-center">
          <h2 class="editor-wrapper__title">{{ activeTask.template.title }}</h2>
          <BtnBase btnStyle="secondary" @click="closeEditor">Закрыть</BtnBase>
        </div>

        <InterviewCodingEditor v-model="solution" />

        <BtnBase btnStyle="default" @click="save">Сохранить решение</BtnBase>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #0a0a1a;
  color: #f0f0ff;
}

.editor-wrapper {
  border-left: 2px solid rgba(120, 130, 255, 0.2);
  padding-left: 16px;
  min-width: 0;
}

.editor-wrapper__title {
  font-weight: 600;
  font-size: 18px;
  color: #f0f0ff;
}

.tasks__list {
  min-width: 0;
}

@media (max-width: 1024px) {
  .content {
    flex-direction: column;
  }

  .tasks {
    width: 100%;
  }

  .editor-wrapper {
    width: 100%;
    border-left: none;
    padding-left: 0;
    margin-top: 16px;
  }
}
</style>
