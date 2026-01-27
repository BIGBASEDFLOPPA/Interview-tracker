<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import InterviewsList from "../components/interview/InterviewsList.vue";
import { useInterviewsStore } from "../stores/interviews.store";
import { Interview } from "../types/interview.types";

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
  <section class="interviews-page">
    <h1 class="page-title">Собеседования</h1>

    <InterviewsList
        :interviews="interviews"
        @select="goToInterview"
    />
  </section>
</template>

<style>
.interviews-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
  min-height: 100vh;

  background: radial-gradient(
      circle at top,
      #1b1f3a 0%,
      #0b0d1a 65%
  );
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #e5e7ff;
  margin-bottom: 24px;
}

/* mobile */
@media (max-width: 640px) {
  .interviews-page {
    padding: 16px;
  }

  .page-title {
    font-size: 20px;
  }
}
</style>

