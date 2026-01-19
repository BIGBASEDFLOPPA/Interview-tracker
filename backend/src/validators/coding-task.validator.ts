import { z } from "zod";

export const interviewIdParamSchema = z.object({
    interviewId: z.string().regex(/^\d+$/),
});

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/),
});

export const addTemplateSchema = z.object({
    templateId: z.number().int().positive(),
});

export const createTemplateSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    tags: z.array(z.string()).default([]),
});

export const updateCodingTaskSchema = z
    .object({
        solution: z.string(),
        completed: z.boolean(),
    })
    .partial();
