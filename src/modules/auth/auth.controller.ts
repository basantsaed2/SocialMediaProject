import { type Request, type Response, Router } from "express";
import authService from "./auth.service";
import { loginSchema, signUpSchema, verifyEmailSchema } from "./auth.validation";
import { BadRequestException } from "../../common/exceptions/app.exception";
import { validation } from "../../middleware";
import { SuccessResponse } from "../../common/exceptions/success.response";

const router = Router();

router.post(
  "/login",
  validation(loginSchema),
  async (req: Request, res: Response) => {
    let values = loginSchema.body.safeParse(req.body);
    if (!values.success) {
      throw new BadRequestException("Validation error", values.error.issues);
    }
    const data = await authService.login(values.data);
    return SuccessResponse({ res, message: "Login successful", data });
  },
);

router.post(
  "/signUp",
  validation(signUpSchema),
  async (req: Request, res: Response) => {
    let values = signUpSchema.body.safeParse(req.body);
    if (!values.success) {
      throw new BadRequestException("Validation error", values.error.issues);
    }
    const data = await authService.signUp(values.data);
    return SuccessResponse({ res, message: "User created successfully", data });
  },
);

router.post(
  "/verifyCode",
  validation(verifyEmailSchema),
  async (req: Request, res: Response) => {
    let values = verifyEmailSchema.body.safeParse(req.body);
    if (!values.success) {
      throw new BadRequestException("Validation error", values.error.issues);
    }
    const data = await authService.verifyEmail(values.data.email, values.data.code);
    return SuccessResponse({ res, message: "Email verified successfully", data });
  },
);

export default router;
