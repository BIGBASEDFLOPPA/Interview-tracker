
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";

class AuthService {
    async register(email: string, password: string, name: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            });

            return {
                id: user.id,
                email: user.email,
                name: user.name
            };
        } catch {
            throw new Error("EMAIL_EXISTS");
        }
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return { token };
    }
}

export default new AuthService();
