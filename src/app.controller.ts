import cors from "cors";
import express from "express";
import type { Express } from "express";
import { globalErrorHandler } from "./middleware/error.middleware";
import { authRouter } from "./modules";
import { connectionDB } from "./database/index";
import { env } from "./config/env.service";

export const bootstrap = async () => {
  const app: Express = express();

  app.use(cors(), express.json());
  app.use(express.urlencoded({ extended: true }));

  await connectionDB();

  app.use("/auth", authRouter);

  app.use(globalErrorHandler);

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
};
