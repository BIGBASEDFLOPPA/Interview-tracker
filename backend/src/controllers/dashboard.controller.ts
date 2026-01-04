import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service';

export async function getDashboard(req: Request, res: Response) {
    const userId = req.user.id;
    const data = await dashboardService.getDashboard(userId);
    res.json(data);
}
