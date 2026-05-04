"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    const data = await auth_service_1.default.login(req.body);
    res.json(data);
});
router.post("/signUp", async (req, res) => {
    const data = await auth_service_1.default.signUp(req.body);
    res.json(data);
});
exports.default = router;
