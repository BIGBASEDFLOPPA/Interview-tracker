export interface CodingTaskTemplate {
    id: number;
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
}

export interface InterviewCodingTask {
    id: number;
    interviewId: number;
    templateId: number;
    solution?: string;
    completed: boolean;
    createdAt: string;
    template: CodingTaskTemplate;
}

export type InterviewCodingTasksResponse = InterviewCodingTask[];
