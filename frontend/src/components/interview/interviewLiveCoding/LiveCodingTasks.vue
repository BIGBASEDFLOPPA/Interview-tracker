<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps<{ interviewId: number }>();
const tasks = ref<any[]>([]);

const formOpen = ref(false);
const form = ref<any>({ id: null, title: '', description: '', tags: '' });

const fetchTasks = async () => {
  const res = await axios.get('/api/livecoding/tasks', { params: { interviewId: props.interviewId, page: 1, limit: 50 }});
  tasks.value = res.data.items;
};

const openForm = () => {
  formOpen.value = true;
  form.value = { id: null, title: '', description: '', tags: '' };
};

const edit = (t: any) => {
  form.value = { ...t, tags: t.tags.join(',') };
  formOpen.value = true;
};

const closeForm = () => formOpen.value = false;

const save = async () => {
  const payload = { ...form.value, tags: form.value.tags.split(','), interviewId: props.interviewId };
  if(form.value.id) {
    await axios.put(`/api/livecoding/tasks/${form.value.id}`, payload);
  } else {
    await axios.post('/api/livecoding/tasks', payload);
  }
  await fetchTasks();
  closeForm();
};

const remove = async (id: number) => {
  await axios.delete(`/api/livecoding/tasks/${id}`);
  await fetchTasks();
};

onMounted(fetchTasks);
watch(() => props.interviewId, fetchTasks);
</script>


<template>
  <div class="mt-4">
    <h3 class="font-semibold mb-2">LiveCoding</h3>
    <button @click="openForm()" class="mb-2 text-blue-500">+ Добавить задачу</button>

    <div v-for="t in tasks" :key="t.id" class="border p-2 mb-1 rounded">
      <p><strong>Задача:</strong> {{ t.title }}</p>
      <p>{{ t.description }}</p>
      <div class="mt-1 flex gap-2">
        <button @click="edit(t)" class="text-blue-500">Редактировать</button>
        <button @click="remove(t.id)" class="text-red-500">Удалить</button>
      </div>
    </div>

    <div v-if="formOpen" class="mt-2 p-2 border rounded">
      <input v-model="form.title" placeholder="Название задачи" class="border p-1 w-full mb-1"/>
      <textarea v-model="form.description" placeholder="Описание" class="border p-1 w-full mb-1"/>
      <input v-model="form.tags" placeholder="Теги через запятую" class="border p-1 w-full mb-1"/>

      <div class="flex gap-2">
        <button @click="save()" class="text-green-500">Сохранить</button>
        <button @click="closeForm()" class="text-gray-500">Отмена</button>
      </div>
    </div>
  </div>
</template>
