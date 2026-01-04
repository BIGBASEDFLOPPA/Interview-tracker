import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dashboardService = {
    async getDashboard(userId: number) {

        const interviewsTotal = await prisma.interview.count({
            where: { userId }
        });

        const interviewsByStatus = await prisma.interview.groupBy({
            by: ['status'],
            where: { userId },
            _count: true
        });

        const lastInterviews = await prisma.interview.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 5,
            select: {
                id: true,
                title: true,
                company: true,
                date: true,
                status: true
            }
        });

        const theoryTotal = await prisma.theoryQuestion.count({
            where: { userId }
        });

        const theoryLearned = await prisma.theoryQuestion.count({
            where: { userId, learned: true }
        });

        const liveTasksTotal = await prisma.liveCodingTask.count();

        const liveSolved = await prisma.liveCodingSolution.count({
            where: {
                userId,
                completed: true
            }
        });

        const liveProgress =
            liveTasksTotal === 0
                ? 0
                : Math.round((liveSolved / liveTasksTotal) * 100);

        return {
            interviews: {
                total: interviewsTotal,
                byStatus: interviewsByStatus,
                last: lastInterviews
            },
            theory: {
                total: theoryTotal,
                learned: theoryLearned,
                notLearned: theoryTotal - theoryLearned
            },
            liveCoding: {
                totalTasks: liveTasksTotal,
                solved: liveSolved,
                progressPercent: liveProgress
            }
        };
    }
};
