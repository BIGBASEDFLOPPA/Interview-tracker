import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const codingTaskService = {
    async getInterviewCodingTasks(userId: number, interviewId: number) {
        return prisma.interviewCodingTask.findMany({
            where: {
                interview: {
                    id: interviewId,
                    userId
                }
            },
            include: {
                template: true
            },
            orderBy: { createdAt: "desc" }
        });
    },

    async addTemplateToInterview(
        userId: number,
        interviewId: number,
        templateId: number
    ) {
        return prisma.interviewCodingTask.create({
            data: {
                interview: { connect: { id: interviewId } },
                template: { connect: { id: templateId } }
            },
            include: {
                template: true
            }
        });
    },

    async createTemplateAndAddToInterview(
        userId: number,
        interviewId: number,
        data: { title: string; description: string; tags: string[] }
    ) {
        return prisma.interviewCodingTask.create({
            data: {
                interview: { connect: { id: interviewId } },
                template: { create: data }
            },
            include: {
                template: true
            }
        });
    },

    async updateInterviewCodingTask(
        userId: number,
        id: number,
        data: { solution?: string; completed?: boolean }
    ) {
        return prisma.interviewCodingTask.updateMany({
            where: {
                id,
                interview: { userId }
            },
            data
        });
    },

    async removeInterviewCodingTask(userId: number, id: number) {
        return prisma.interviewCodingTask.deleteMany({
            where: {
                id,
                interview: { userId }
            }
        });
    }
};
