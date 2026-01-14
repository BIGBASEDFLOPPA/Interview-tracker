<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";


import { useTheoryStore } from "../../stores/useTheoryStore";


import TheoryList from "./interviewTheory/TheoryList.vue";
import AddTheoryItem from "./interviewTheory/AddTheoryItem.vue";
import LiveCodingTaskList from "./interviewLiveCoding/LiveCodingTaskList.vue";
import AddLiveCodingTask from "./interviewLiveCoding/AddLiveCodingTask.vue";
import {useInterviewLiveCodingStore} from "../../stores/useLiveCodingStore";
import {useInterviewsStore} from "../../stores/interviews.store";

const route = useRoute();
const interviewId = Number(route.params.id);

const tab = ref<"livecoding" | "theory">("livecoding");

const interviewsStore = useInterviewsStore();
const theoryStore = useTheoryStore();
const liveCodingStore = useInterviewLiveCodingStore();

onMounted(async () => {
  await interviewsStore.loadInterviewById(interviewId);
  await theoryStore.loadTheory({ interviewId });
  await liveCodingStore.loadTasks(interviewId);
});
</script>
vue
Копировать код
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
          :interviewId="interviewId"
          @task-added="liveCodingStore.loadTasks(interviewId)"
      />

      <LiveCodingTaskList
          :tasks="liveCodingStore.items"
          @updated="liveCodingStore.loadTasks(interviewId)"
          @removed="liveCodingStore.loadTasks(interviewId)"
      />
    </div>

    <div v-if="tab === 'theory'">
      <AddTheoryItem
          :interviewId="interviewId"
          @theory-added="theoryStore.loadTheory({ interviewId })"
      />

      <TheoryList
          :items="theoryStore.items"
          @updated="theoryStore.loadTheory({ interviewId })"
          @removed="theoryStore.loadTheory({ interviewId })"
      />
    </div>
  </div>
</template>