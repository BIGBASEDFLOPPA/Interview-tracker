import api from "./api";

export function fetchInterviewLiveTasks(interviewId: number) {
    return api.get(`/api/interview-livecoding/${interviewId}`);
}

export function addLiveCodingTask(payload: {
    interviewId: number;
    taskId: number;
}) {
    return api.post("/api/interview-livecoding", payload);
}

export function updateLiveCodingTask(
    id: number,
    payload: { solution?: string; completed?: boolean }
) {
    return api.put(`/api/interview-livecoding/${id}`, payload);
}

export function removeLiveCodingTask(id: number) {
    return api.delete(`/api/interview-livecoding/${id}`);
}
