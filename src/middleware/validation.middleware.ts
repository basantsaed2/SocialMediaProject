import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "../common/exceptions/app.exception";


export const validation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(Object.keys(schema))
        let validationError: any[] = [];
        for (let key of Object.keys(schema) as any[]) {
            if (!schema[key]) {
                continue;
            }

            let values = schema[key].safeParse(req[key as keyof Request]);
            console.log(values)
            if (!values.success) {
                validationError.push({ key, value: values.error.issue })
            }
        }
        if (validationError.length > 0) {
            throw new BadRequestException("Validation error", validationError)
        }
        next()
    }
}