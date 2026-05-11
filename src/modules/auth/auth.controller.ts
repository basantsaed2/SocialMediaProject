import { type Request, type Response, Router } from "express";
import authService from "./auth.service";
import { signUpSchema } from "./auth.validation";
import { BadRequestException } from "../../common/exceptions/app.exception";
import { validation } from "../../middleware";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    const data = await authService.login(req.body);
    res.json(data);
});

router.post("/signUp", validation(signUpSchema), async (req: Request, res: Response) => {
    let values = signUpSchema.body.safeParse(req.body)

    if (!values.success) {
        throw new BadRequestException("Validation Error", values.error)
    }
    const data = await authService.signUp(values.data);
    res.json(data);
});

export default router;