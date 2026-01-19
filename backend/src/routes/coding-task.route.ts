import { Router } from "express";
import {
    getInterviewCodingTasks,
    addTemplateToInterview,
    createTemplateAndAddToInterview,
    updateInterviewCodingTask,
    removeInterviewCodingTask
} from "../controllers/coding-task.controller";

import { validate } from "../middleware/validate.middleware";
import {
    interviewIdParamSchema,
    idParamSchema,
    addTemplateSchema,
    createTemplateSchema,
    updateCodingTaskSchema,
} from "../validators/coding-task.validator";

const router = Router();

router.get(
    "/:interviewId",
    validate(interviewIdParamSchema, "params"),
    getInterviewCodingTasks
);

router.post(
    "/:interviewId",
    validate(interviewIdParamSchema, "params"),
    validate(addTemplateSchema),
    addTemplateToInterview
);

router.post(
    "/:interviewId/create",
    validate(interviewIdParamSchema, "params"),
    validate(createTemplateSchema),
    createTemplateAndAddToInterview
);

router.patch(
    "/:id",
    validate(idParamSchema, "params"),
    validate(updateCodingTaskSchema),
    updateInterviewCodingTask
);

router.delete(
    "/:id",
    validate(idParamSchema, "params"),
    removeInterviewCodingTask
);

export default router;
