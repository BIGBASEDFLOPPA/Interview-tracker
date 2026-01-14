<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useInterviewsStore } from "../../stores/interviews.store";
import { useTheoryStore } from "../../stores/useTheoryStore";
import { useInterviewLiveCodingStore } from "../../stores/useLiveCodingStore";

import TheoryList from "./interviewTheory/TheoryList.vue";
import AddTheoryItem from "./interviewTheory/AddTheoryItem.vue";
import LiveCodingTaskList from "./interviewLiveCoding/LiveCodingTaskList.vue";
import AddLiveCodingTask from "./interviewLiveCoding/AddLiveCodingTask.vue";

const props = defineProps<{
  interviewId: number;
}>();

const tab = ref<"livecoding" | "theory">("livecoding");

const interviewsStore = useInterviewsStore();
const theoryStore = useTheoryStore();
const liveCodingStore = useInterviewLiveCodingStore();

onMounted(async () => {
  await interviewsStore.loadInterviewById(props.interviewId);
  await theoryStore.loadTheory({ interviewId: props.interviewId });
  await liveCodingStore.loadTasks(props.interviewId);
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ interviewsStore.currentInterview?.title }}
      ({{ interviewsStore.currentInterview?.company }})
    </h1>

    <div class="mb-4">
      <button
          class="px-3 py-1 rounded mr-2"
          :class="tab === 'livecoding' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          @click="tab = 'livecoding'"
      >
        LiveCoding
      </button>
      <button
          class="px-3 py-1 rounded"
          :class="tab === 'theory' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          @click="tab = 'theory'"
      >
        Теория
      </button>
    </div>

    <div v-if="tab === 'livecoding'">
      <AddLiveCodingTask
          :interview-id="props.interviewId"
          @task-added="liveCodingStore.loadTasks(props.interviewId)"
      />

      <LiveCodingTaskList
          :tasks="liveCodingStore.items"
          @updated="liveCodingStore.loadTasks(props.interviewId)"
          @removed="liveCodingStore.loadTasks(props.interviewId)"
      />
    </div>

    <div v-if="tab === 'theory'">
      <AddTheoryItem
          :interview-id="props.interviewId"
          @theory-added="theoryStore.loadTheory({ interviewId: props.interviewId })"
      />

      <TheoryList
          :items="theoryStore.items"
          @updated="theoryStore.loadTheory({ interviewId: props.interviewId })"
          @removed="theoryStore.loadTheory({ interviewId: props.interviewId })"
      />
    </div>
  </div>
</template>
