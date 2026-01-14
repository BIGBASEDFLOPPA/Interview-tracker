export type InterviewStatus =
    | "PLANNED"
    | "PASSED"
    | "FAILED"
    | "FAKE";

export interface Interview {
    id: number;
    title: string;
    company: string;
    date: string;
    status: InterviewStatus;
}

export interface InterviewsResponse {
    items: Interview[];
    total: number;
}
