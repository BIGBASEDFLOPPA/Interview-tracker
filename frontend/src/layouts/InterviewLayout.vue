<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {useInterviewsStore} from "../stores/interviews.store";


const route = useRoute();
const router = useRouter();
const interviewId = Number(route.params.id);

const interviewsStore = useInterviewsStore();

onMounted(() => {
  interviewsStore.loadInterviewById(interviewId);
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ interviewsStore.currentInterview?.title }}
      ({{ interviewsStore.currentInterview?.company }})
    </h1>

    <div class="mb-4 flex gap-2">
      <button
          @click="router.push(`/interviews/${interviewId}/theory`)"
          :class="$route.path.endsWith('/theory') ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          class="px-3 py-1 rounded"
      >
        Теория
      </button>

      <button
          @click="router.push(`/interviews/${interviewId}/livecoding`)"
          :class="$route.path.endsWith('/livecoding') ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          class="px-3 py-1 rounded"
      >
        LiveCoding
      </button>
    </div>

    <router-view />
  </div>
</template>
