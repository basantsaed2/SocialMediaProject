import { Response } from "express";

export const SuccessResponse = ({
    res,
    status = 200,
    message = "Success",
    data = null
}: {
    res: Response,
    status?: number,
    message?: string,
    data?: any
}) => {
    return res.status(status).json({ message, data });
}