<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddTheoryItem from "../components/interview/interviewTheory/AddTheoryItem.vue";
import TheoryList from "../components/interview/interviewTheory/TheoryList.vue";
import { useTheoryStore } from "../stores/useTheoryStore";
import InterviewHeaderTabs from "../components/interview/InterviewHeaderTabs.vue";

const route = useRoute();
const interviewId = Number(route.params.id);

const theoryStore = useTheoryStore();

onMounted(() => {
  loadTheories();
});

function loadTheories() {
  theoryStore.loadTheory({ interviewId });
}

function handleUpdate(payload: { id: number; learned: boolean }) {
  theoryStore.updateTheoryItem(payload.id, { learned: payload.learned });
}

function handleRemove(id: number) {
  theoryStore.removeTheory(id);
}
</script>

<template>
  <InterviewHeaderTabs :interview="interviewId" />
  <AddTheoryItem
      :interview-id="interviewId"
      @theory-added="loadTheories"
  />

  <TheoryList
      :items="theoryStore.items"
      @update="handleUpdate"
      @remove="handleRemove"
  />
</template>
