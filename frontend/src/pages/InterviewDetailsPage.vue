<script setup lang="ts">
import { useRoute } from 'vue-router';
import InterviewDetailsCard from "../components/interview/InterviewDetailsCard.vue";

const route = useRoute();
const interviewId = Number(route.params.id);
</script>

<template>
  <InterviewDetailsCard
      :interview-id="interviewId"
  />
</template>
