<script setup lang="ts">
import { ref, watch } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { runInSandbox } from "../../../utils/runInSandbox";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>();

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
      <button class="run-btn" @click="run">Run</button>
    </div>

    <pre class="output">{{ output }}</pre>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  background: linear-gradient(145deg, #0f0f2f, #1b1b45);
  padding: 12px;
  border: 1px solid rgba(120, 130, 255, 0.2);
  height: 450px;
}

.monaco {
  width: 100%;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.run-btn {
  background: linear-gradient(to right, #4f46e5, #6366f1);
  color: #fff;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.run-btn:hover {
  background: linear-gradient(to right, #6366f1, #4f46e5);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.output {
  background: #0f0f2f;
  color: #0f0;
  padding: 10px;
  border-radius: 8px;
  min-height: 60px;
  font-family: "Fira Code", monospace;
  white-space: pre-wrap;
  overflow-x: auto;
}
</style>
