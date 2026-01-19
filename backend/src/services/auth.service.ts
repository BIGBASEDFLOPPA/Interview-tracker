import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";

class AuthService {
    async register(email: string, password: string, name: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: { email, name, password: hashedPassword },
            });

            const token = this.generateToken(user.id, user.email);

            return {
                user: { id: user.id, email: user.email, name: user.name },
                token,
            };
        } catch (err) {
            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code === "P2002"
            ) {
                throw new Error("EMAIL_EXISTS");
            }
            throw err;
        }
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("INVALID_CREDENTIALS");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("INVALID_CREDENTIALS");

        const token = this.generateToken(user.id, user.email);
        return { token };
    }

    private generateToken(userId: number, email: string) {
        return jwt.sign({ id: userId, email }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });
    }
}

export default new AuthService();
