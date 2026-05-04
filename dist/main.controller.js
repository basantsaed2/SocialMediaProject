"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const bootstrap = () => {
    const app = (0, express_1.default)();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};
exports.bootstrap = bootstrap;
