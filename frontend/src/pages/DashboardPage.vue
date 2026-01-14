<script setup lang="ts">
import { onMounted } from 'vue'
import {useDashboardStore} from "../stores/useDashboardStore";


const dashboard = useDashboardStore()

onMounted(() => {
  dashboard.fetchDashboard()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700">Dashboard</h1>

    <div v-if="dashboard.isLoading">Loading...</div>
    <div v-else-if="dashboard.error" class="text-red-500">{{ dashboard.error }}</div>
    <div v-else-if="dashboard.data">
      <section class="mb-6">
        <h2 class="font-semibold">Interviews</h2>
        <p>Total: {{ dashboard.data.interviews.total }}</p>
        <ul>
          <li v-for="s in dashboard.data.interviews.byStatus" :key="s.status">
            {{ s.status }}: {{ s._count }}
          </li>
        </ul>
        <h3>Last interviews:</h3>
        <ul>
          <li v-for="i in dashboard.data.interviews.last" :key="i.id">
            {{ i.date }} - {{ i.company }} - {{ i.title }} ({{ i.status }})
          </li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="font-semibold">Theory</h2>
        <p>Total: {{ dashboard.data.theory.total }}</p>
        <p>Learned: {{ dashboard.data.theory.learned }}</p>
        <p>Not Learned: {{ dashboard.data.theory.notLearned }}</p>
      </section>

      <section class="mb-6">
        <h2 class="font-semibold">LiveCoding</h2>
        <p>Total Tasks: {{ dashboard.data.liveCoding.totalTasks }}</p>
        <p>Solved: {{ dashboard.data.liveCoding.solved }}</p>
        <p>Progress: {{ dashboard.data.liveCoding.progressPercent }}%</p>
      </section>
    </div>
  </div>
</template>
