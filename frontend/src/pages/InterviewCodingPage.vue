<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useInterviewCodingStore} from "../stores/useInterviewCodingStore";
import InterviewCodingTaskCard from "../components/interview/interviewCoding/InterviewCodingTaskCard.vue";
import InterviewCodingEditor from "../components/interview/interviewCoding/InterviewCodingEditor.vue";
import AddInterviewCodingTask from "../components/interview/interviewCoding/AddInterviewCodingTask.vue";
import {InterviewCodingTask} from "../types/interview-coding.types";


const liveCodingStore = useInterviewCodingStore();
const route = useRoute();

const tasks = computed<InterviewCodingTask[]>(() => liveCodingStore.tasks);
const activeTask = computed<InterviewCodingTask | null>(() => liveCodingStore.activeTask);
const interviewId = Number(route.params.id);
const solution = ref("");

watch(
    activeTask,
    task => {
      solution.value = task?.solution ?? "";
    },
    {immediate: true}
);

async function save() {
  if (!activeTask.value) return;

  await liveCodingStore.updateTask(activeTask.value.id, {
    solution: solution.value,
    completed: true
  });

  liveCodingStore.closeTask();
}

function closeEditor() {
  liveCodingStore.closeTask();
}

onMounted(() => {
  liveCodingStore.loadTasks(Number(route.params.id));
});
</script>

<template>
  <div class="page">
    <div>
      <AddInterviewCodingTask :interview-id='interviewId'/>
    </div>
    <div class="tasks">
      <InterviewCodingTaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
      />
    </div>

    <div v-if="activeTask" class="editor">
      <header>
        <h2>{{ activeTask.template.title }}</h2>
        <button @click="closeEditor">Закрыть</button>
      </header>
      <InterviewCodingEditor v-model="solution"/>
      <button @click="save">Сохранить решение</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  gap: 1rem;
}

.tasks {
  width: 40%;
}

.editor {
  width: 60%;
  border-left: 2px solid #eee;
  padding-left: 1rem;
}
</style>
