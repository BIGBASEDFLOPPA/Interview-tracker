<script setup lang="ts">
import { useInterviewsStore } from '../stores/interviews.store';

const store = useInterviewsStore();
</script>

<template>
  <div>
    <h3>Entries</h3>

    <div>
      <button @click="store.setEntriesFilter('ALL')">All</button>
      <button @click="store.setEntriesFilter('NOTE')">Notes</button>
      <button @click="store.setEntriesFilter('QUESTION')">Questions</button>
      <button @click="store.setEntriesFilter('THEORY')">Theory</button>
      <button @click="store.setEntriesFilter('LIVE_CODING')">Live</button>
    </div>

    <ul>
      <li
          v-for="entry in store.filteredEntries"
          :key="entry.id"
      >
        <strong>[{{ entry.type }}]</strong>
        {{ entry.content }}

        <button @click="store.removeEntry(entry.id)">
          delete
        </button>
      </li>
    </ul>
  </div>
</template>
