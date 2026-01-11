import { defineStore } from 'pinia';
import { interviewsApi } from '../api/interviews.api';
import { interviewEntriesApi } from '../api/interviewEntries.api';

export const useInterviewsStore = defineStore('interviews', {
    state: () => ({
        items: [] as any[],
        currentInterview: null as any,
        isLoading: false,
        error: null as string | null,
        entriesFilter: 'ALL' as string,
    }),

    getters: {
        filteredEntries(state) {
            if (!state.currentInterview) return [];

            if (state.entriesFilter === 'ALL') {
                return state.currentInterview.entries;
            }

            return state.currentInterview.entries.filter(
                (e: any) => e.type === state.entriesFilter
            );
        }
    },

    actions: {
        async fetchInterviewById(id: number) {
            this.isLoading = true;
            try {
                const { data } = await interviewsApi.getById(id);
                this.currentInterview = data;
            } catch {
                this.error = 'Interview not found';
            } finally {
                this.isLoading = false;
            }
        },

        async addEntry(type: string, content: string) {
            if (!this.currentInterview) return;

            const interviewId = this.currentInterview.id;

            const { data } = await interviewEntriesApi.add(interviewId, {
                type,
                content,
            });

            this.currentInterview.entries.push(data);
        },

        async removeEntry(entryId: number) {
            await interviewEntriesApi.remove(entryId);

            this.currentInterview.entries = this.currentInterview.entries.filter(
                (e: any) => e.id !== entryId
            );
        },

        setEntriesFilter(type: string) {
            this.entriesFilter = type;
        }
    }
});
