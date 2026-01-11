import api from './api';

export interface Interview {
    id: number;
    title: string;
    company: string;
    date: string;
    status: string;
    type: string;
}

export interface InterviewsResponse {
    items: Interview[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const interviewsApi = {
    getAll(params?: Record<string, any>) {
        return api.get<InterviewsResponse>('/api/interviews', { params });
    },

    getById(id: number) {
        return api.get(`/api/interviews/${id}`);
    },

    create(data: {
        title: string;
        company: string;
        date: string;
        status: string;
        type: string;
    }) {
        return api.post('/api/interviews', data);
    },

    update(id: number, data: any) {
        return api.put(`/api/interviews/${id}`, data);
    },

    remove(id: number) {
        return api.delete(`/api/interviews/${id}`);
    }
};
