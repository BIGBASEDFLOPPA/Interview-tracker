import { Request, Response } from 'express';
import { theoryService } from '../services/theory.service';

export async function createTheory(req: Request, res: Response) {
    const userId = req.user.id;
    const theory = await theoryService.create(userId, req.body);
    res.json(theory);
}

export async function getTheory(req: Request, res: Response) {
    const userId = req.user.id;
    const data = await theoryService.getAll(userId, req.query);
    res.json(data);
}

export async function updateTheory(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);
    const theory = await theoryService.update(userId, id, req.body);
    res.json(theory);
}

export async function deleteTheory(req: Request, res: Response) {
    const userId = req.user.id;
    const id = Number(req.params.id);
    await theoryService.remove(userId, id);
    res.json({ success: true });
}
