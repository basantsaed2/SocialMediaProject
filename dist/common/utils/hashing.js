"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_service_1 = require("../../config/env.service");
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(Number(env_service_1.env.SALT_ROUNDS));
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashPassword) => {
    const isMatch = await bcryptjs_1.default.compare(password, hashPassword);
    return isMatch;
};
exports.comparePassword = comparePassword;
