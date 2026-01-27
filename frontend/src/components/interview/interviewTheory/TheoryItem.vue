<script setup lang="ts">
import { ref, watch } from "vue";
import { Theory } from "../../../types/theory.types";
import BtnBase from "../../ui/BtnBase.vue";

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
  emit("update", { id: props.item.id, learned: learned.value });
}

function removeItem() {
  emit("remove", props.item.id);
}
</script>

<template>
  <div class="theory-item flex flex-col md:flex-row md:justify-between p-4 rounded gap-3">
    <div>
      <p class="theory-item__title">{{ item.question }}</p>
      <p class="theory-item__text">{{ item.answer }}</p>
      <p class="theory-item__meta mt-1">{{ item.category }} | {{ item.scope }}</p>
    </div>

    <div class="theory-item__actions flex flex-col sm:flex-row gap-2 items-start sm:items-center mt-2 sm:mt-0">
      <label class="flex items-center gap-1">
        <input type="checkbox" v-model="learned" />
        Изучено
      </label>
      <BtnBase btnStyle="default" @click="save">Сохранить</BtnBase>
      <BtnBase btnStyle="danger" @click="removeItem">Удалить</BtnBase>
    </div>
  </div>
</template>

<style scoped>
.theory-item {
  border: 1px solid rgba(120, 130, 255, 0.2);
  background: linear-gradient(145deg, #0f0f2f, #1b1b45);
  min-width: 0;
}

.theory-item__title {
  font-weight: 600;
  color: #f0f0ff;
}

.theory-item__text {
  color: #d0d0ff;
  font-size: 14px;
}

.theory-item__meta {
  font-size: 12px;
  color: #aab0ff;
}
</style>
