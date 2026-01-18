import api from "./api";
import { InterviewCodingTask } from "../types/interview-coding.types";

export function fetchInterviewCodingTasks(interviewId: number) {
    return api.get<InterviewCodingTask[]>(`/api/interview-coding/${interviewId}`);
}

export function createInterviewCodingTask(
    interviewId: number,
    payload: { title: string; description: string; tags?: string[] }
) {
    return api.post<InterviewCodingTask>(`/api/interview-coding/${interviewId}/create`, payload);
}

export function updateInterviewCodingTask(
    id: number,
    payload: { solution?: string; completed?: boolean }
) {
    return api.patch(`/api/interview-coding/${id}`, payload);
}

export function deleteInterviewCodingTask(id: number) {
    return api.delete(`/api/interview-coding/${id}`);
}
