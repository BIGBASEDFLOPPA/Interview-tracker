<script setup lang="ts">
import { Interview } from "../../types/interview.types";

defineProps<{
  interviews: Interview[];
}>();

const emit = defineEmits<{
  (e: "select", interview: Interview): void;
}>();

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function statusClass(status: string) {
  switch (status) {
    case "PLANNED":
      return "status--planned";
    case "PASSED":
      return "status--passed";
    case "FAILED":
      return "status--failed";
    case "FAKE":
      return "status--fake";
    default:
      return "status--fake";
  }
}
</script>

<template>
  <div class="interviews-list">
    <div
        v-for="interview in interviews"
        :key="interview.id"
        class="interview-card"
        @click="emit('select', interview)"
    >
      <div class="interview-main">
        <p class="interview-title">{{ interview.title }}</p>
        <p class="interview-company">{{ interview.company }}</p>
        <p class="interview-date">{{ formatDate(interview.date) }}</p>
      </div>
      <span
          class="interview-status"
          :class="statusClass(interview.status)"
      >
        {{ interview.status }}
      </span>
    </div>
  </div>
</template>

<style>
/* Container */
.interviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

/* Card */
.interview-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-radius: 16px;
  background: linear-gradient(145deg, #0f0f2f, #1b1b45);
  border: 1px solid rgba(120, 130, 255, 0.2);
  box-shadow: 0 4px 12px rgba(120, 130, 255, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
}

.interview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(120, 130, 255, 0.25);
  border-color: rgba(120, 130, 255, 0.35);
}

/* Card Content */
.interview-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.interview-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.interview-company {
  font-size: 14px;
  color: #aab0ff;
}

.interview-date {
  font-size: 12px;
  color: #8b8fcf;
}

/* Status */
.interview-status {
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  min-width: 80px;
  text-align: center;
  transition: all 0.3s ease;
}

/* Status Colors (мягкие градиенты) */
.status--planned {
  background: linear-gradient(135deg, #ffd966, #f4b400);
  color: #1a1a1a;
}

.status--passed {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: #052e1a;
}

.status--failed {
  background: linear-gradient(135deg, #fb7185, #e11d48);
  color: #2a0a0a;
}

.status--fake {
  background: linear-gradient(135deg, #818cf8, #6366f1);
  color: #0b102e;
}

/* Responsive */
@media (max-width: 640px) {
  .interview-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .interview-status {
    align-self: flex-end;
  }
}
</style>
