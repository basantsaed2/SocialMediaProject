import { z } from "zod"

export const signUpSchema = {
    body: z.strictObject({
        name: z.string().min(2).max(20),
        email: z.email(),
        password: z.string().min(6).max(20),
        phone: z.string().min(10).max(15)
    })
}