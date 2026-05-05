"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validation_1 = require("./auth.validation");
const app_exception_1 = require("../../common/exceptions/app.exception");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    const data = await auth_service_1.default.login(req.body);
    res.json(data);
});
router.post("/signUp", async (req, res) => {
    let values = auth_validation_1.signUpSchema.body.safeParse(req.body);
    if (!values.success) {
        throw new app_exception_1.BadRequestException("Validation Error", values.error);
    }
    const data = await auth_service_1.default.signUp(values.data);
    res.json(data);
});
exports.default = router;
