import api from './api';

export const interviewEntriesApi = {
    add(interviewId: number, data: {
        type: string;
        content: string;
    }) {
        return api.post(`/api/interview-entries/${interviewId}`, data);
    },

    remove(id: number) {
        return api.delete(`/api/interview-entries/${id}`);
    }
};
