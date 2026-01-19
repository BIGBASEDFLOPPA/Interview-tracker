import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidateTarget = "body" | "query" | "params";

export const validate =
    (schema: ZodSchema, target: ValidateTarget = "body") =>
    (req: Request, res: Response, next: NextFunction) => {
        const data = req[target];

        const parsed = schema.safeParse(data);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error.format(),
            });
        }

        req[target] = parsed.data as any;
        next();
    };
