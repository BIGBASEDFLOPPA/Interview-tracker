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
    <h1 class="text-2xl font-bold mb-4 text-amber-700">Статистика</h1>

    <div v-if="dashboard.isLoading">Загрузка...</div>
    <div v-else-if="dashboard.error" class="text-red-500">{{ dashboard.error }}</div>
    <div v-else-if="dashboard.data">
      <section class="mb-6">
        <h2 class="font-semibold">Собеседования</h2>
        <p>Total: {{ dashboard.data.interviews.total }}</p>
        <ul>
          <li v-for="s in dashboard.data.interviews.byStatus" :key="s.status">
            {{ s.status }}: {{ s._count }}
          </li>
        </ul>
        <h3>Последние собеседования:</h3>
        <ul>
          <li v-for="i in dashboard.data.interviews.last" :key="i.id">
            {{ i.date }} - {{ i.company }} - {{ i.title }} ({{ i.status }})
          </li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="font-semibold">Теория</h2>
        <p>Всего: {{ dashboard.data.theory.total }}</p>
        <p>Выучено: {{ dashboard.data.theory.learned }}</p>
        <p>Не выучено: {{ dashboard.data.theory.notLearned }}</p>
      </section>

      <section class="mb-6">
        <h2 class="font-semibold">ЛайвКодинг</h2>
        <p>Всего: {{ dashboard.data.liveCoding.totalTasks }}</p>
        <p>Решено: {{ dashboard.data.liveCoding.solved }}</p>
        <p>Прогресс: {{ dashboard.data.liveCoding.progressPercent }}%</p>
      </section>
    </div>
  </div>
</template>
