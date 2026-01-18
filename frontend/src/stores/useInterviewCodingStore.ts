import { defineStore } from "pinia";
import { ref } from "vue";
import {
    fetchInterviewCodingTasks,
    createInterviewCodingTask,
    updateInterviewCodingTask,
    deleteInterviewCodingTask
} from "../api/interview-coding.api";
import { InterviewCodingTask } from "../types/interview-coding.types";

export const useInterviewCodingStore = defineStore("interviewCoding", () => {
    const tasks = ref<InterviewCodingTask[]>([]);
    const activeTask = ref<InterviewCodingTask | null>(null);
    const loading = ref(false);

    async function loadTasks(interviewId: number) {
        loading.value = true;
        try {
            const { data } = await fetchInterviewCodingTasks(interviewId);
            tasks.value = data;
        } finally {
            loading.value = false;
        }
    }

    async function addTask(
        interviewId: number,
        payload: { title: string; description: string; tags: string[] }
    ) {
        loading.value = true;
        try {
            const { data } = await createInterviewCodingTask(interviewId, payload);
            tasks.value.unshift(data);
        } finally {
            loading.value = false;
        }
    }

    function openTask(task: InterviewCodingTask) {
        activeTask.value = task;
    }

    function closeTask() {
        activeTask.value = null;
    }

    async function updateTask(
        id: number,
        payload: { solution?: string; completed?: boolean }
    ) {
        await updateInterviewCodingTask(id, payload);

        const index = tasks.value.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks.value[index] = {
                ...tasks.value[index],
                ...payload
            };

            if (activeTask.value?.id === id) {
                activeTask.value = tasks.value[index];
            }
        }
    }

    async function removeTask(id: number) {
        await deleteInterviewCodingTask(id);
        tasks.value = tasks.value.filter(t => t.id !== id);

        if (activeTask.value?.id === id) {
            activeTask.value = null;
        }
    }

    return {
        tasks,
        activeTask,
        loading,
        loadTasks,
        addTask,
        openTask,
        closeTask,
        updateTask,
        removeTask
    };
});
