import { Request, Response } from 'express';
import { livecodingService } from '../services/livecoding.service';

export async function createTask(req: Request, res: Response) {
    const task = await livecodingService.createTask(req.body);
    res.json(task);
}

export async function getTasks(req: Request, res: Response) {
    const data = await livecodingService.getTasks(req.query);
    res.json(data);
}

export async function addSolution(req: Request, res: Response) {
    const userId = req.user.id;
    const { taskId, content } = req.body;
    const solution = await livecodingService.addSolution(userId, taskId, content);
    res.json(solution);
}

export async function updateSolution(req: Request, res: Response) {
    const userId = req.user.id;
    const solutionId = Number(req.params.id);
    const solution = await livecodingService.updateSolution(userId, solutionId, req.body);
    res.json(solution);
}

export async function getSolutions(req: Request, res: Response) {
    const userId = req.user.id;
    const taskId = Number(req.params.taskId);
    const solutions = await livecodingService.getSolutions(userId, taskId);
    res.json(solutions);
}

export async function getProgress(req: Request, res: Response) {
    const userId = req.user.id;
    const progress = await livecodingService.getProgress(userId);
    res.json(progress);
}
