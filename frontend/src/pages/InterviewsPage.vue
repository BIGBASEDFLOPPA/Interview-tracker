<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useInterviewsStore } from "../stores/interviews.store";

import { Interview } from "../types/interview.types";
import InterviewsList from "../components/interview/InterviewsList.vue";



const interviewsStore = useInterviewsStore();
const router = useRouter();

const interviews = computed(() => interviewsStore.interviews);

function goToInterview(interview: Interview) {
  router.push(`/interviews/${interview.id}`);
}

onMounted(() => {
  interviewsStore.loadInterviews();

});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список интервью</h1>

    <InterviewsList
        :interviews="interviews"
        @select="goToInterview"
    />
  </div>
</template>
