import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const interviewLiveCodingService = {
    async addTaskToInterview(userId: number, interviewId: number, taskId: number) {
        const interview = await prisma.interview.findFirst({
            where: { id: interviewId, userId }
        });

        if (!interview) throw new Error("Interview not found");

        return prisma.interviewLiveCodingTask.create({
            data: {
                interviewId,
                taskId
            },
            include: {
                task: true
            }
        });
    },

    async getInterviewTasks(userId: number, interviewId: number) {
        return prisma.interviewLiveCodingTask.findMany({
            where: {
                interviewId,
                interview: { userId }
            },
            include: {
                task: true
            },
            orderBy: { createdAt: "desc" }
        });
    },

    async updateSolution(userId: number, id: number, data: { solution?: string; completed?: boolean }) {
        return prisma.interviewLiveCodingTask.updateMany({
            where: {
                id,
                interview: { userId }
            },
            data
        });
    },

    async removeTask(userId: number, id: number) {
        return prisma.interviewLiveCodingTask.deleteMany({
            where: {
                id,
                interview: { userId }
            }
        });
    }
};
