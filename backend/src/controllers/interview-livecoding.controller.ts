import { Request, Response } from "express";
import { interviewLiveCodingService } from "../services/interview-livecoding.service";

export async function addTaskToInterview(req: Request, res: Response) {
    const userId = req.user.id;
    const { interviewId, taskId } = req.body;

    if (!Number.isInteger(interviewId) || !Number.isInteger(taskId)) {
        return res.status(400).json({ message: "Invalid interviewId or taskId" });
    }

    try {
        const item = await interviewLiveCodingService.addTaskToInterview(
            userId,
            interviewId,
            taskId
        );
        res.json(item);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function getInterviewTasks(req: Request, res: Response) {
    const userId = req.user.id;
    const interviewId = Number(req.params.interviewId);

    if (!Number.isInteger(interviewId)) {
        return res.status(400).json({ message: "Invalid interviewId" });
    }

    try {
        const items = await interviewLiveCodingService.getInterviewTasks(
            userId,
            interviewId
        );
        res.json(items);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateSolution(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid task id" });
    }

    try {
        await interviewLiveCodingService.updateSolution(userId, id, req.body);
        res.json({ success: true });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function removeTask(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid task id" });
    }

    try {
        await interviewLiveCodingService.removeTask(userId, id);
        res.json({ success: true });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}
