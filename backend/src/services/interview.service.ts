import { PrismaClient, InterviewStatus, InterviewType } from "@prisma/client";

const prisma = new PrismaClient();

export const interviewService = {
    async create(userId: number, data: {
        title: string;
        company: string;
        date: string;
        status: InterviewStatus;
        type: InterviewType;
    }) {
        return prisma.interview.create({
            data: {
                title: data.title,
                company: data.company,
                date: new Date(data.date),
                status: data.status,
                type: data.type,
                userId
            }
        });
    },

    async getAll(
        userId: number,
        query: {
            status?: string;
            type?: string;
            from?: string;
            to?: string;
            search?: string;
            sort?: string;
            page?: string;
            limit?: string;
        }
    ) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const where: any = { userId };

        if (query.status) {
            where.status = query.status;
        }

        if (query.type) {
            where.type = query.type;
        }

        if (query.from || query.to) {
            where.date = {};
            if (query.from) where.date.gte = new Date(query.from);
            if (query.to) where.date.lte = new Date(query.to);
        }

        if (query.search) {
            where.OR = [
                { company: { contains: query.search, mode: "insensitive" } },
                { title: { contains: query.search, mode: "insensitive" } }
            ];
        }

        let orderBy: any = { date: "desc" };

        if (query.sort === "date_asc") orderBy = { date: "asc" };
        if (query.sort === "company_asc") orderBy = { company: "asc" };
        if (query.sort === "company_desc") orderBy = { company: "desc" };

        const [items, total] = await Promise.all([
            prisma.interview.findMany({
                where,
                orderBy,
                skip,
                take: limit
            }),
            prisma.interview.count({ where })
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    },

    async getById(id: number, userId: number) {
        return prisma.interview.findFirst({
            where: { id, userId },
            include: { entries: true }
        });
    },

    async update(id: number, userId: number, data: Partial<{
        title: string;
        company: string;
        date: string;
        status: InterviewStatus;
        type: InterviewType;
    }>) {
        return prisma.interview.updateMany({
            where: { id, userId },
            data: {
                ...data,
                ...(data.date && { date: new Date(data.date) })
            }
        });
    },

    async remove(id: number, userId: number) {
        return prisma.interview.deleteMany({
            where: { id, userId }
        });
    }
};
