import { z } from "zod";
import { TheoryCategory, TheoryScope } from "@prisma/client";

export const createTheorySchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    category: z.nativeEnum(TheoryCategory),
    scope: z.nativeEnum(TheoryScope),
});

export const updateTheorySchema = z.object({
    question: z.string().min(1).optional(),
    answer: z.string().min(1).optional(),
    category: z.nativeEnum(TheoryCategory).optional(),
    scope: z.nativeEnum(TheoryScope).optional(),
    learned: z.boolean().optional(),
});

export const theoryQuerySchema = z.object({
    category: z.nativeEnum(TheoryCategory).optional(),
    scope: z.nativeEnum(TheoryScope).optional(),
    learned: z.coerce.boolean().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
});
