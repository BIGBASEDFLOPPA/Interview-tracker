<script setup lang="ts">
import { ref } from 'vue';
import { useInterviewsStore } from '../stores/interviews.store';

const store = useInterviewsStore();

const type = ref('NOTE');
const content = ref('');

const submit = async () => {
  if (!content.value) return;

  await store.addEntry(type.value, content.value);
  content.value = '';
};
</script>

<template>
  <div>
    <h3>Add entry</h3>

    <select v-model="type">
      <option value="NOTE">Note</option>
      <option value="QUESTION">Question</option>
      <option value="THEORY">Theory</option>
      <option value="LIVE_CODING">Live coding</option>
    </select>

    <textarea v-model="content" />

    <button @click="submit">Add</button>
  </div>
</template>
