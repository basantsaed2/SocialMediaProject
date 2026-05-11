import { Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: any) => {
    const status = err.status || 500;
    const response: Record<string, unknown> = {
        status,
        message: err.message || "Internal Server Error",
    };

    if (err.cause) {
        response.errors = err.cause;
    }

    if (process.env.MOOD !== "prod") {
        response.stack = err.stack;
    }

    return res.status(status).json(response);
}