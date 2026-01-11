import { Router } from "express";
import authService from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

const setTokenCookie = (res: any, token: string) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

router.post("/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.format(),
        });
    }

    const { email, password, name } = parsed.data;

    try {
        const { user, token } = await authService.register(email, password, name);
        setTokenCookie(res, token);
        res.json({ message: "Registered successfully", user });
    } catch {
        res.status(400).json({ message: "Email already exists" });
    }
});

router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.format(),
        });
    }

    const { email, password } = parsed.data;

    try {
        const { token } = await authService.login(email, password);
        setTokenCookie(res, token);
        res.json({ message: "Logged in successfully" });
    } catch {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

router.post("/logout", (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.json({ message: "Logged out" });
});

export default router;
