import { z } from "zod";
import { InterviewStatus, InterviewType } from "@prisma/client";

export const createInterviewSchema = z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    date: z.string().datetime(),
    status: z.nativeEnum(InterviewStatus),
    type: z.nativeEnum(InterviewType),
});

export const updateInterviewSchema = z.object({
    title: z.string().min(1).optional(),
    company: z.string().min(1).optional(),
    date: z.string().datetime().optional(),
    status: z.nativeEnum(InterviewStatus).optional(),
    type: z.nativeEnum(InterviewType).optional(),
});

export const interviewQuerySchema = z.object({
    status: z.nativeEnum(InterviewStatus).optional(),
    type: z.nativeEnum(InterviewType).optional(),
    search: z.string().optional(),
    sort: z.enum(["date", "createdAt"]).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
});
