import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const livecodingService = {

    async createTask(data: { title: string; description: string; tags: string[] }) {
        return prisma.liveCodingTask.create({ data });
    },

    async getTasks(query: { tag?: string; page?: string; limit?: string }) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 20;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (query.tag) {
            where.tags = { has: query.tag };
        }

        const [items, total] = await Promise.all([
            prisma.liveCodingTask.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
            prisma.liveCodingTask.count({ where })
        ]);

        return { items, total, page, limit };
    },

    async addSolution(userId: number, taskId: number, content: string) {
        return prisma.liveCodingSolution.create({
            data: { userId, taskId, content }
        });
    },

    async updateSolution(userId: number, solutionId: number, data: { content?: string; completed?: boolean }) {
        return prisma.liveCodingSolution.update({
            where: { id: solutionId, userId },
            data
        });
    },

    async getSolutions(userId: number, taskId: number) {
        return prisma.liveCodingSolution.findMany({
            where: { userId, taskId }
        });
    },

    async getProgress(userId: number) {
        const totalTasks = await prisma.liveCodingTask.count();
        const solved = await prisma.liveCodingSolution.count({
            where: { userId, completed: true }
        });
        return { totalTasks, solved };
    }
};
