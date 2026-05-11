"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const modules_1 = require("./modules");
const index_1 = require("./database/index");
const bootstrap = async () => {
    const app = (0, express_1.default)();
    await (0, index_1.connectionDB)();
    app.use((0, cors_1.default)(), express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/auth", modules_1.authRouter);
    app.use(error_middleware_1.globalErrorHandler);
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};
exports.bootstrap = bootstrap;
