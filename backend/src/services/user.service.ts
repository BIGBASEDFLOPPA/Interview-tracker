import prisma from "../../prisma/client";

class UserService {
    async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });
    }

    async getCurrentUser(userId: number) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });
    }
}

export default new UserService();