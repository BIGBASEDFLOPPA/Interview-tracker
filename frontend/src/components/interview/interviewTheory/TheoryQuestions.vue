<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import {useTheoryStore} from "../../../stores/useTheoryStore";


const props = defineProps<{ interviewId: number }>();
const theoryStore = useTheoryStore();

const formOpen = ref(false);
const form = ref({
  id: null,
  question: "",
  answer: "",
  category: "JS_TS",
  scope: "FRONTEND"
});

const fetchQuestions = async () => {
  await theoryStore.loadTheory({ interviewId: props.interviewId, page: 1, limit: 50 });
};

const openForm = () => {
  formOpen.value = true;
  form.value = { id: null, question: "", answer: "", category: "JS_TS", scope: "FRONTEND" };
};

const edit = (q: any) => {
  form.value = { ...q };
  formOpen.value = true;
};

const closeForm = () => {
  formOpen.value = false;
};

const save = async () => {
  if (form.value.id) {
    await theoryStore.updateTheoryItem(form.value.id, form.value);
  } else {
    await theoryStore.addTheory({ ...form.value, interviewId: props.interviewId });
  }
  await fetchQuestions();
  closeForm();
};

const remove = async (id: number) => {
  await theoryStore.removeTheory(id);
  await fetchQuestions();
};

onMounted(fetchQuestions);
watch(() => props.interviewId, fetchQuestions);
</script>

<template>
  <div class="mt-4">
    <h3 class="font-semibold mb-2">Теория</h3>
    <button @click="openForm" class="mb-2 text-blue-500">+ Добавить вопрос</button>

    <div v-for="q in theoryStore.items" :key="q.id" class="border p-2 mb-1 rounded">
      <p><strong>Вопрос:</strong> {{ q.question }}</p>
      <p><strong>Ответ:</strong> {{ q.answer }}</p>
      <p>
        <strong>Категория:</strong> {{ q.category }} |
        <strong>Область:</strong> {{ q.scope }}
      </p>
      <div class="mt-1 flex gap-2">
        <button @click="edit(q)" class="text-blue-500">Редактировать</button>
        <button @click="remove(q.id)" class="text-red-500">Удалить</button>
      </div>
    </div>

    <div v-if="formOpen" class="mt-2 p-2 border rounded">
      <input
          v-model="form.question"
          placeholder="Вопрос"
          class="border p-1 w-full mb-1"
      />
      <input
          v-model="form.answer"
          placeholder="Ответ"
          class="border p-1 w-full mb-1"
      />
      <select v-model="form.category" class="border p-1 w-full mb-1">
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS_TS">JS/TS</option>
        <option value="FRAMEWORKS">Frameworks</option>
        <option value="ALGORITHMS">Algorithms</option>
        <option value="OTHER">Other</option>
      </select>
      <select v-model="form.scope" class="border p-1 w-full mb-1">
        <option value="FRONTEND">Frontend</option>
        <option value="BACKEND">Backend</option>
        <option value="FULLSTACK">Fullstack</option>
      </select>

      <div class="flex gap-2">
        <button @click="save" class="text-green-500">Сохранить</button>
        <button @click="closeForm" class="text-gray-500">Отмена</button>
      </div>
    </div>
  </div>
</template>

