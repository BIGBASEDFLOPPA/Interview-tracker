<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { defineProps, defineEmits } from "vue";
import {useTheoryStore} from "../../../stores/useTheoryStore";

const theoryStore = useTheoryStore();
const props = defineProps<{ interviewId: number }>();
const emit = defineEmits(["theory-added"]);

const question = ref("");
const answer = ref("");
const category = ref("");
const scope = ref("");

async function addTheory() {
  if (!question.value || !answer.value || !category.value || !scope.value) return;

  await theoryStore.addTheory({
    question: question.value,
    answer: answer.value,
    category: category.value,
    scope: scope.value,
    interviewId: props.interviewId
  });

  question.value = "";
  answer.value = "";
  category.value = "";
  scope.value = "";

  emit("theory-added");
}
</script>

<template>
  <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2">
    <input
        v-model="question"
        placeholder="Вопрос"
        class="border px-2 py-1 rounded w-full md:w-64"
    />
    <input
        v-model="answer"
        placeholder="Ответ"
        class="border px-2 py-1 rounded w-full md:w-64"
    />
    <select v-model="category" class="border px-2 py-1 rounded">
      <option disabled value="">Категория</option>
      <option value="HTML">HTML</option>
      <option value="CSS">CSS</option>
      <option value="JS_TS">JS_TS</option>
      <option value="FRAMEWORKS">FRAMEWORKS</option>
      <option value="ALGORITHMS">ALGORITHMS</option>
      <option value="OTHER">OTHER</option>
    </select>
    <select v-model="scope" class="border px-2 py-1 rounded">
      <option disabled value="">Сфера</option>
      <option value="FRONTEND">FRONTEND</option>
      <option value="BACKEND">BACKEND</option>
      <option value="FULLSTACK">FULLSTACK</option>
    </select>
    <button
        class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        :disabled="!question || !answer || !category || !scope"
        @click="addTheory"
    >
      Добавить
    </button>
  </div>
</template>

