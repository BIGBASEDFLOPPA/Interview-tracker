<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useInterviewsStore } from '../stores/interviews.store';

import InterviewEntries from '../components/InterviewEntries.vue';
import AddInterviewEntry from '../components/AddInterviewEntry.vue';

const route = useRoute();
const store = useInterviewsStore();

onMounted(() => {
  store.fetchInterviewById(Number(route.params.id));
});
</script>

<template>
  <div v-if="store.currentInterview">
    <h2>
      {{ store.currentInterview.company }} —
      {{ store.currentInterview.title }}
    </h2>

    <AddInterviewEntry />
    <InterviewEntries />
  </div>
</template>
