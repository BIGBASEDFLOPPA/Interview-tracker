import { defineStore } from "pinia";
import { ref } from "vue";
import {
    fetchInterviewLiveTasks,
    addLiveCodingTask,
    updateLiveCodingTask,
    removeLiveCodingTask
} from "../api/interviewLiveCoding.api";

export interface InterviewLiveCodingItem {
    id: number;
    interviewId: number;
    taskId: number;
    solution?: string;
    completed: boolean;
    task: {
        id: number;
        title: string;
        description?: string;
    };
}

export const useInterviewLiveCodingStore = defineStore(
    "interview-livecoding",
    () => {
        const items = ref<InterviewLiveCodingItem[]>([]);
        const isLoading = ref(false);
        const error = ref<string | null>(null);

        async function loadTasks(interviewId: number) {
            isLoading.value = true;
            error.value = null;

            try {
                const { data } = await fetchInterviewLiveTasks(interviewId);
                items.value = data;
            } catch (e: any) {
                error.value = e?.message ?? "Failed to load livecoding tasks";
            } finally {
                isLoading.value = false;
            }
        }

        async function createTask(interviewId: number, taskId: number) {
            const { data } = await addLiveCodingTask({ interviewId, taskId });
            items.value.unshift(data);
        }

        async function updateTask(
            id: number,
            payload: { solution?: string; completed?: boolean }
        ) {
            await updateLiveCodingTask(id, payload);

            const index = items.value.findIndex(i => i.id === id);
            if (index !== -1) {
                items.value[index] = {
                    ...items.value[index],
                    ...payload
                };
            }
        }

        async function removeTaskById(id: number) {
            await removeLiveCodingTask(id);
            items.value = items.value.filter(i => i.id !== id);
        }

        return {
            items,
            isLoading,
            error,
            loadTasks,
            createTask,
            updateTask,
            removeTaskById
        };
    }
);
