import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/global.css";
import "./assets/tailwind.css";

import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueMonacoEditorPlugin, {
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.54.0/min/vs"
    }
});

app.mount("#app");
