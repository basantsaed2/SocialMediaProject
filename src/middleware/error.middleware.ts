import { Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: any) => {
    return res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
        status: err.statusCode,
        cause: err.cause
    })
}