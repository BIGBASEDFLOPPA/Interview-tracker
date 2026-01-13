import { Router } from "express";
import {
    addTaskToInterview,
    getInterviewTasks,
    updateSolution,
    removeTask
} from "../controllers/interview-livecoding.controller";

const router = Router();

router.post("/", addTaskToInterview);

router.get("/:interviewId", getInterviewTasks);

router.put("/:id", updateSolution);

router.delete("/:id", removeTask);

export default router;
