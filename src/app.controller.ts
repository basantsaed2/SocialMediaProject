import cors from "cors";
import express from "express";
import type { Express } from "express";
import { globalErrorHandler } from "./middleware/error.middleware";
import { authRouter } from "./modules";
import { connectionDB } from "./database/index";

export const bootstrap = async() => {
    const app: Express = express();

    await connectionDB();

    app.use(cors(), express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/auth", authRouter);

    app.use(globalErrorHandler);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });

}