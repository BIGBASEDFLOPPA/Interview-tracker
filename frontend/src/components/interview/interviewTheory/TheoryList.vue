<script lang="ts" setup>
import { defineProps } from "vue";
import TheoryItem from "./TheoryItem.vue";

const props = defineProps<{ items: any[] }>();
</script>

<template>
  <div class="space-y-2">
    <TheoryItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @updated="$emit('updated')"
        @removed="$emit('removed')"
    />
  </div>
</template>

