"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_exception_1 = require("../../common/exceptions/app.exception");
class AuthService {
    constructor() { }
    login(data) {
        throw new app_exception_1.ApplicationException("Login failed", 401);
    }
    signUp(data) {
        return data;
    }
}
exports.default = new AuthService();
