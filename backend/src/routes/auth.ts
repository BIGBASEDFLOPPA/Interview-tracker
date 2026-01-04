import { Router } from "express";
import authService from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

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
        const user = await authService.register(email, password, name);
        res.json(user);
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
        const result = await authService.login(email, password);
        res.json(result);
    } catch {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

export default router;
