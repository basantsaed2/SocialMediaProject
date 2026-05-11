import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "../common/exceptions/app.exception";


export const validation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationErrors: Array<{ key: string; issues: unknown }> = [];

        for (const key of Object.keys(schema) as Array<keyof typeof schema>) {
            if (!schema[key]) {
                continue;
            }

            const value = req[key as keyof Request];
            const result = schema[key].safeParse(value);
            if (!result.success) {
                validationErrors.push({
                    key: String(key),
                    issues: result.error.issues,
                });
            }
        }

        if (validationErrors.length > 0) {
            throw new BadRequestException("Validation error", validationErrors);
        }

        next();
    }
}