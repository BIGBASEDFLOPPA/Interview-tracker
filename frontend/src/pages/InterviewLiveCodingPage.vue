<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddLiveCodingTask from "../components/interview/interviewLiveCoding/AddLiveCodingTask.vue";
import LiveCodingTaskList from "../components/interview/interviewLiveCoding/LiveCodingTaskList.vue";
import {useInterviewLiveCodingStore} from "../stores/useLiveCodingStore";


const route = useRoute();
const interviewId = Number(route.params.id);

const liveCodingStore = useInterviewLiveCodingStore();

onMounted(() => {
  liveCodingStore.loadTasks(interviewId);
});
</script>

<template>
  <AddLiveCodingTask
      :interview-id="interviewId"
      @task-added="liveCodingStore.loadTasks(interviewId)"
  />

  <LiveCodingTaskList
      :tasks="liveCodingStore.items"
      @updated="liveCodingStore.loadTasks(interviewId)"
      @removed="liveCodingStore.loadTasks(interviewId)"
  />
</template>
