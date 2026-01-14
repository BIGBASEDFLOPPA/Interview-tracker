import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const interviewLiveCodingService = {
    async addTaskToInterview(userId: number, interviewId: number, taskId: number) {
        if (!Number.isInteger(interviewId)) throw new Error("Invalid interviewId");
        if (!Number.isInteger(taskId)) throw new Error("Invalid taskId");

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
        if (!Number.isInteger(interviewId)) throw new Error("Invalid interviewId");

        return prisma.interviewLiveCodingTask.findMany({
            where: {
                interview: {
                    id: interviewId,
                    userId
                }
            },
            include: { task: true },
            orderBy: { createdAt: "desc" }
        });
    },

    async updateSolution(
        userId: number,
        id: number,
        data: { solution?: string; completed?: boolean }
    ) {
        if (!Number.isInteger(id)) throw new Error("Invalid task id");

        return prisma.interviewLiveCodingTask.updateMany({
            where: {
                id,
                interview: { userId }
            },
            data
        });
    },

    async removeTask(userId: number, id: number) {
        if (!Number.isInteger(id)) throw new Error("Invalid task id");

        return prisma.interviewLiveCodingTask.deleteMany({
            where: {
                id,
                interview: { userId }
            }
        });
    }
};