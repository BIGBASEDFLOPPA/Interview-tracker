import api from "./api";
import {Theory, TheoryResponse} from "../types/theory.types";


export function fetchTheory(params?: Record<string, any>) {
    return api.get<TheoryResponse>("api/theory", {
        params
    });
}

export function createTheory(payload: Partial<Theory>) {
    return api.post<Theory>("api/theory", payload);
}

export function updateTheory(id: number, payload: Partial<Theory>) {
    return api.put(`api/theory/${id}`, payload);
}

export function deleteTheory(id: number) {
    return api.delete(`api/theory/${id}`);
}
