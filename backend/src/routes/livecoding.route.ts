import { Router } from 'express';
import {
    createTask,
    getTasks,
    addSolution,
    updateSolution,
    getSolutions,
    getProgress
} from '../controllers/livecoding.controller';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);

router.post('/solutions', addSolution);
router.put('/solutions/:id', updateSolution);
router.get('/solutions/:taskId', getSolutions);

router.get('/progress', getProgress);

export default router;
