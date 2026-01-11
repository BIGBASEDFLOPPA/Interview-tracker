import { Router } from "express";
import { interviewEntryService } from "../services/interviewEntry.service";
import { createInterviewEntrySchema } from "../validators/interviewEntry.validator";

const router = Router();

router.post("/:interviewId", async (req, res) => {
    const userId = (req as any).user.id;

    const parsed = createInterviewEntrySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error.format(),
        });
    }

    const entry = await interviewEntryService.add(
        Number(req.params.interviewId),
        userId,
        parsed.data
    );

    res.json(entry);
});

router.delete("/:id", async (req, res) => {
    await interviewEntryService.remove(Number(req.params.id));
    res.json({ success: true });
});

export default router;
