import { defineStore } from "pinia";
import { ref } from "vue";
import {Theory} from "../types/theory.types";
import {createTheory, deleteTheory, fetchTheory, updateTheory} from "../api/theory.api";



export const useTheoryStore = defineStore("theory", () => {
    const items = ref<Theory[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function loadTheory(params?: Record<string, any>) {
        isLoading.value = true;
        error.value = null;

        try {
            const { data } = await fetchTheory(params);
            items.value = data.items;
        } catch (e: any) {
            error.value = e?.message ?? "Failed to load theory";
        } finally {
            isLoading.value = false;
        }
    }

    async function addTheory(payload: Partial<Theory>) {
        const { data } = await createTheory(payload);
        items.value.unshift(data);
    }

    async function updateTheoryItem(id: number, payload: Partial<Theory>) {
        await updateTheory(id, payload);

        const index = items.value.findIndex(i => i.id === id);
        if (index !== -1) {
            items.value[index] = {
                ...items.value[index],
                ...payload
            };
        }
    }

    async function removeTheory(id: number) {
        await deleteTheory(id);
        items.value = items.value.filter(i => i.id !== id);
    }

    return {
        items,
        isLoading,
        error,
        loadTheory,
        addTheory,
        updateTheoryItem,
        removeTheory
    };
});
