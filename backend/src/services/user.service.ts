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
}

export default new UserService();
