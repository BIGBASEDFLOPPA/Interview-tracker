<script setup lang="ts">
import { ref, watch } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import {runInSandbox} from "../../../utils/runInSandbox";


const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();

const code = ref(props.modelValue);
const output = ref("");

watch(code, v => emit("update:modelValue", v));

async function run() {
  output.value = "⏳ Выполнение...";
  output.value = await runInSandbox(code.value, 1000);
}
</script>

<template>
  <div class="editor">
    <vue-monaco-editor
        v-model:value="code"
        language="javascript"
        theme="vs-dark"
        class="monaco"
    />

    <div class="actions">
      <button @click="run"> Run</button>
    </div>

    <pre class="output">{{ output }}</pre>
  </div>
</template>

<style>
.monaco {
  width: 100%;
}
.editor {
  height: 320px;
  border: 1px solid #333;
  padding: 12px;
}


.actions {
  margin-top: 8px;
}

.output {
  background: #111;
  color: #0f0;
  padding: 8px;
  margin-top: 8px;
  min-height: 40px;
}
</style>
