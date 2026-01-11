import { Router } from 'express';
import {
    createTheory,
    getTheory,
    updateTheory,
    deleteTheory
} from '../controllers/theory.controller';

import {
    createTheorySchema,
    updateTheorySchema,
    theoryQuerySchema
} from '../validators/theory.validator';

const router = Router();

router.post('/', async (req, res, next) => {
    const parsed = createTheorySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: parsed.error.format(),
        });
    }

    req.body = parsed.data;
    next();
}, createTheory);

router.get('/', async (req, res, next) => {
    const parsed = theoryQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({
            message: 'Invalid query params',
            errors: parsed.error.format(),
        });
    }

    req.query = parsed.data as any;
    next();
}, getTheory);

router.put('/:id', async (req, res, next) => {
    const parsed = updateTheorySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: 'Validation error',
            errors: parsed.error.format(),
        });
    }

    req.body = parsed.data;
    next();
}, updateTheory);

router.delete('/:id', deleteTheory);

export default router;
