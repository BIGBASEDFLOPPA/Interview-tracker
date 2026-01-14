<script setup lang="ts">
import { ref, watch } from "vue";
import {Theory} from "../../../types/theory.types";




const props = defineProps<{
  item: Theory;
}>();

const emit = defineEmits<{
  (e: "update", payload: { id: number; learned: boolean }): void;
  (e: "remove", id: number): void;
}>();

const learned = ref(props.item.learned);

watch(
    () => props.item.learned,
    (val) => (learned.value = val)
);

function save() {
  emit("update", {
    id: props.item.id,
    learned: learned.value
  });
}

function removeItem() {
  emit("remove", props.item.id);
}
</script>
<template>
  <div class="border p-4 rounded shadow flex flex-col md:flex-row md:justify-between">
    <div>
      <p class="font-semibold">{{ item.question }}</p>
      <p class="text-gray-600">{{ item.answer }}</p>
      <p class="text-sm text-gray-400 mt-1">
        {{ item.category }} | {{ item.scope }}
      </p>
    </div>

    <div class="mt-2 md:mt-0 flex gap-2 items-center">
      <label class="flex items-center gap-1">
        <input type="checkbox" v-model="learned" />
        Изучено
      </label>

      <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="save">
        Сохранить
      </button>

      <button class="bg-red-500 text-white px-3 py-1 rounded" @click="removeItem">
        Удалить
      </button>
    </div>
  </div>
</template>
