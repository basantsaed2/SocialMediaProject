import { z } from "zod"

export const signUpSchema = {
    body: z.strictObject({
        name: z.string({ error: "Name is required" }).min(2, { message: "Name must be at least 2 characters" }).max(20, { message: "Name must be at most 20 characters" }),
        email: z.email({ error: "Invalid email format" }),
        password: z.string({ error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }).max(20, { message: "Password must be at most 20 characters" }),
        phone: z.string({ error: "Phone is required" }).min(10, { message: "Phone must be at least 10 characters" }).max(15, { message: "Phone must be at most 15 characters" }),
        confirmPassword: z.string({ error: "Confirm password is required" }).min(6, { message: "Confirm password must be at least 6 characters" }).max(20, { message: "Confirm password must be at most 20 characters" })
    }).refine((data) => {
        if (data.password !== data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: "Password and confirm password must match",
    })
}

export const loginSchema = {
    body: z.strictObject({
        email: z.email({ error: "Invalid email format" }),
        password: z.string({ error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }).max(20, { message: "Password must be at most 20 characters" })
    })
}

export const verifyEmailSchema = {
    body: z.strictObject({
        email: z.email({ error: "Invalid email format" }),
        code: z.string({ error: "Code is required" })
    })
}