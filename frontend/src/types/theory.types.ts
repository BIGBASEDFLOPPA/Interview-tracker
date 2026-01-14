export type TheoryScope = "FRONTEND"| "BACKEND" | "FULLSTACK ";

export interface Theory {
    id: number;
    question: string;
    answer: string;
    category: string;
    scope: TheoryScope;
    learned: boolean;
    interviewId?: number | null;
}

export interface TheoryResponse {
    items: Theory[];
    total: number;
}
