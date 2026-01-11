<script setup lang="ts">
import { onMounted } from 'vue';
import { useInterviewsStore } from '../stores/interviews.store';
import { useRouter } from 'vue-router';

const store = useInterviewsStore();
const router = useRouter();

onMounted(() => {
  store.filteredEntries();
});
</script>

<template>
  <div>
    <h1>Interviews</h1>

    <div v-if="store.isLoading">Loading...</div>

    <ul v-else>
      <li
          v-for="interview in store.items"
          :key="interview.id"
          @click="router.push(`/interviews/${interview.id}`)"
          style="cursor: pointer"
      >
        {{ interview.company }} — {{ interview.title }} ({{ interview.status }})
      </li>
    </ul>
  </div>
</template>
