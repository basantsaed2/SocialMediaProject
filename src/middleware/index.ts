import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validation = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {

    }

}