import { Router } from "express";
import {
    addTemplateToInterview,
    createTemplateAndAddToInterview,
    getInterviewCodingTasks,
    updateInterviewCodingTask,
    removeInterviewCodingTask
} from "../controllers/coding-task.controller";

const router = Router();

router.get("/:interviewId", getInterviewCodingTasks);
router.post("/:interviewId", addTemplateToInterview);
router.post("/:interviewId/create", createTemplateAndAddToInterview);
router.patch("/:id", updateInterviewCodingTask);
router.delete("/:id", removeInterviewCodingTask);

export default router;
