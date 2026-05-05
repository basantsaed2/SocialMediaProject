"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = {
    body: zod_1.z.strictObject({
        name: zod_1.z.string().min(2).max(20),
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6).max(20),
    })
};
