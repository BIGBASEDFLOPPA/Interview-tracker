<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import InterviewsList from "../components/interview/InterviewsList.vue";
import {useInterviewsStore} from "../stores/interviews.store";
import {Interview} from "../types/interview.types";


const interviewsStore = useInterviewsStore();
const router = useRouter();

const interviews = computed(() => interviewsStore.interviews);

function goToInterview(interview: Interview) {
  router.push(`/interviews/${interview.id}/theory`);
}

onMounted(() => {
  interviewsStore.loadInterviews();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список собеседований</h1>

    <InterviewsList
        :interviews="interviews"
        @select="goToInterview"
    />
  </div>
</template>
