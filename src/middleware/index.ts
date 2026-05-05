import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../common/exceptions/app.exception";

export const validation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(Object.keys(schema))
        for (const key of Object.keys(schema) as any[]) {
            if (!schema[key]) {
                continue
            }
            const values = schema[key].safeParse(req[key as keyof Request])
            console.log(values)
        }

    }

}