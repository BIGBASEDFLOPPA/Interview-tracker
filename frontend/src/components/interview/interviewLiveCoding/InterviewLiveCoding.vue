<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LiveCodingTaskList from "./LiveCodingTaskList.vue";
import AddLiveCodingTask from "./AddLiveCodingTask.vue";



const route = useRoute();
const interviewId = Number(route.params.id);
const interviewTitle = ref("");

const tasks = ref<any[]>([]);

async function fetchTasks() {
  const { data } = await axios.get(`/api/interview-livecoding/${interviewId}`);
  tasks.value = data;
}

async function fetchInterview() {
  const { data } = await axios.get(`/api/interviews/${interviewId}`);
  interviewTitle.value = data.title;
}

onMounted(() => {
  fetchInterview();
  fetchTasks();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">LiveCoding задачи: {{ interviewTitle }}</h1>

    <AddLiveCodingTask
        :interviewId="interviewId"
        @task-added="fetchTasks"
    />

    <LiveCodingTaskList
        :tasks="tasks"
        @task-updated="fetchTasks"
        @task-removed="fetchTasks"
    />
  </div>
</template>

