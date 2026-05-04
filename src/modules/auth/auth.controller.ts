import { type Request, type Response, Router } from "express";
import authService from "./auth.service";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    const data = await authService.login(req.body);
    res.json(data);
});

router.post("/signUp", async (req: Request, res: Response) => {
    const data = await authService.signUp(req.body);
    res.json(data);
});

export default router;