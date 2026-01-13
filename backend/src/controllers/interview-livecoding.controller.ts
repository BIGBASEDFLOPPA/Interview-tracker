import { Request, Response } from "express";
import { interviewLiveCodingService } from "../services/interview-livecoding.service";

export async function addTaskToInterview(req: Request, res: Response) {
    const userId = req.user.id;
    const { interviewId, taskId } = req.body;

    const item = await interviewLiveCodingService.addTaskToInterview(
        userId,
        interviewId,
        taskId
    );

    res.json(item);
}

export async function getInterviewTasks(req: Request, res: Response) {
    const userId = req.user.id;
    const interviewId = Number(req.params.interviewId);

    const items = await interviewLiveCodingService.getInterviewTasks(
        userId,
        interviewId
    );

    res.json(items);
}

export async function updateSolution(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    await interviewLiveCodingService.updateSolution(
        userId,
        id,
        req.body
    );

    res.json({ success: true });
}

export async function removeTask(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    await interviewLiveCodingService.removeTask(userId, id);

    res.json({ success: true });
}
