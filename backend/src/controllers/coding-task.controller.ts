import { Request, Response } from "express";
import { codingTaskService } from "../services/coding-task.service";

export async function getInterviewCodingTasks(req: Request, res: Response) {
    const userId = req.user.id;
    const interviewId = Number(req.params.interviewId);

    const tasks = await codingTaskService.getInterviewCodingTasks(
        userId,
        interviewId
    );

    res.json(tasks);
}

export async function addTemplateToInterview(req: Request, res: Response) {
    const userId = req.user.id;
    const interviewId = Number(req.params.interviewId);
    const { templateId } = req.body;

    const task = await codingTaskService.addTemplateToInterview(
        userId,
        interviewId,
        templateId
    );

    res.json(task);
}

export async function createTemplateAndAddToInterview(
    req: Request,
    res: Response
) {
    const userId = req.user.id;
    const interviewId = Number(req.params.interviewId);

    const task = await codingTaskService.createTemplateAndAddToInterview(
        userId,
        interviewId,
        req.body
    );

    res.json(task);
}

export async function updateInterviewCodingTask(
    req: Request,
    res: Response
) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    await codingTaskService.updateInterviewCodingTask(userId, id, req.body);

    res.json({ success: true });
}

export async function removeInterviewCodingTask(
    req: Request,
    res: Response
) {
    const userId = req.user.id;
    const id = Number(req.params.id);

    await codingTaskService.removeInterviewCodingTask(userId, id);

    res.json({ success: true });
}
