import { PrismaClient, InterviewEntryType } from "@prisma/client";

const prisma = new PrismaClient();

export const interviewEntryService = {
    async add(interviewId: number, userId: number, data: {
        type: InterviewEntryType;
        content: string;
    }) {
        const interview = await prisma.interview.findFirst({
            where: { id: interviewId, userId }
        });

        if (!interview) {
            throw new Error("Interview not found");
        }

        return prisma.interviewEntry.create({
            data: {
                interviewId,
                type: data.type,
                content: data.content
            }
        });
    },

    async remove(id: number) {
        return prisma.interviewEntry.delete({
            where: { id }
        });
    }
};
