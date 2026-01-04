import { Router } from "express";
import { interviewService } from "../services/interview.service";
import {
    createInterviewSchema,
    updateInterviewSchema,
    interviewQuerySchema
} from "../validators/interview.validator";

const router = Router();

router.post("/", async (req, res) => {
    const userId = (req as any).user.id;

    const parsed = createInterviewSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.format(),
        });
    }

    const interview = await interviewService.create(userId, parsed.data);
    res.json(interview);
});

router.get("/", async (req, res) => {
    const userId = (req as any).user.id;

    const parsed = interviewQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid query params",
            errors: parsed.error.format(),
        });
    }

    const result = await interviewService.getAll(
        userId,
        parsed.data
    );

    res.json(result);
});

router.get("/:id", async (req, res) => {
    const userId = (req as any).user.id;

    const interview = await interviewService.getById(
        Number(req.params.id),
        userId
    );

    if (!interview) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(interview);
});

router.put("/:id", async (req, res) => {
    const userId = (req as any).user.id;

    const parsed = updateInterviewSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.format(),
        });
    }

    await interviewService.update(
        Number(req.params.id),
        userId,
        parsed.data
    );

    res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
    const userId = (req as any).user.id;

    await interviewService.remove(
        Number(req.params.id),
        userId
    );

    res.json({ success: true });
});

export default router;
