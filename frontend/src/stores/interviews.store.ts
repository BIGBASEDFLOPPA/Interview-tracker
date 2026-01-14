import { defineStore } from "pinia";
import { ref } from "vue";
import type { Interview } from "../types/interview.types";
import {
    fetchInterviews,
    fetchInterviewById,
    createInterview,
    updateInterview,
    deleteInterview
} from "../api/interviews.api";

export const useInterviewsStore = defineStore("interviews", () => {
    const interviews = ref<Interview[]>([]);
    const currentInterview = ref<Interview | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function loadInterviews() {
        isLoading.value = true;
        error.value = null;

        try {
            const { data } = await fetchInterviews();
            interviews.value = data.items;
        } catch (e: any) {
            error.value = e?.message || "Failed to load interviews";
        } finally {
            isLoading.value = false;
        }
    }

    async function loadInterviewById(id: number) {
        isLoading.value = true;
        error.value = null;

        try {
            const { data } = await fetchInterviewById(id);
            currentInterview.value = data;
        } catch (e: any) {
            error.value = e?.message || "Failed to load interview";
        } finally {
            isLoading.value = false;
        }
    }

    async function addInterview(payload: Partial<Interview>) {
        const { data } = await createInterview(payload);
        interviews.value.unshift(data);
    }

    async function editInterview(id: number, payload: Partial<Interview>) {
        await updateInterview(id, payload);

        const index = interviews.value.findIndex(i => i.id === id);
        if (index !== -1) {
            interviews.value[index] = {
                ...interviews.value[index],
                ...payload
            };
        }
    }

    async function removeInterview(id: number) {
        await deleteInterview(id);
        interviews.value = interviews.value.filter(i => i.id !== id);
    }

    return {
        interviews,
        currentInterview,
        isLoading,
        error,
        loadInterviews,
        loadInterviewById,
        addInterview,
        editInterview,
        removeInterview
    };
});
