import { PrismaClient, TheoryCategory, TheoryScope } from '@prisma/client';

const prisma = new PrismaClient();

export const theoryService = {
    async create(userId: number, data: {
        question: string;
        answer: string;
        category: TheoryCategory;
        scope: TheoryScope;
        interviewId?: number;
    }) {
        return prisma.theoryQuestion.create({
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category,
                scope: data.scope,
                userId,
                interviewId: data.interviewId || null
            }
        });
    },

    async getAll(
        userId: number,
        query: {
            search?: string;
            category?: string;
            scope?: string;
            learned?: string;
            interviewId?: string;
            page?: string;
            limit?: string;
        }
    ) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;

        const where: any = { userId };

        if (query.interviewId) {
            where.interviewId = Number(query.interviewId);
        }

        if (query.search) {
            where.OR = [
                { question: { contains: query.search, mode: 'insensitive' } },
                { answer: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        if (query.category) where.category = query.category;
        if (query.scope) where.scope = query.scope;
        if (query.learned !== undefined) where.learned = query.learned === 'true';

        const [items, total] = await Promise.all([
            prisma.theoryQuestion.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.theoryQuestion.count({ where })
        ]);

        return { items, total, page, limit };
    },

    async update(userId: number, id: number, data: any) {
        return prisma.theoryQuestion.update({
            where: { id, userId },
            data
        });
    },

    async remove(userId: number, id: number) {
        return prisma.theoryQuestion.delete({
            where: { id, userId }
        });
    }
};
