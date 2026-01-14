import api from "./api";
import {Interview, InterviewsResponse} from "../types/interview.types";


export function fetchInterviews(params?: Record<string, any>) {
    return api.get<InterviewsResponse>("/api/interviews", {
        params
    });
}

export function fetchInterviewById(id: number) {
    return api.get<Interview>(`/api/interviews/${id}`);
}

export function createInterview(payload: Partial<Interview>) {
    return api.post<Interview>("/api/interviews", payload);
}

export function updateInterview(id: number, payload: Partial<Interview>) {
    return api.put(`/api/interviews/${id}`, payload);
}

export function deleteInterview(id: number) {
    return api.delete(`/api/interviews/${id}`);
}
