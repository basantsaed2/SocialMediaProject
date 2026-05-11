"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_exception_1 = require("../../common/exceptions/app.exception");
const hashing_1 = require("../../common/utils/hashing");
const database_1 = require("../../database");
class AuthService {
    constructor() { }
    async signUp(data) {
        try {
            // Simulate user registration logic
            const { name, email, password, phone } = data;
            if (!name || !email || !password || !phone) {
                throw new app_exception_1.BadRequestException("All fields are required", 400);
            }
            const userExist = await database_1.UserModel.findOne({ email });
            if (userExist) {
                throw new app_exception_1.BadRequestException("User already exists", 409);
            }
            else {
                const hashing = await (0, hashing_1.hashPassword)(password);
                const newUser = await database_1.UserModel.create({
                    name,
                    email,
                    phone,
                    password: hashing,
                });
                await newUser.toJSON();
                return { user: { id: newUser._id.toJSON(), name: newUser.name, email: newUser.email, phone: newUser.phone ?? "" } };
            }
        }
        catch (error) {
            throw new app_exception_1.ApplicationException("Sign Up failed", 500, error);
        }
    }
    async login(data) {
        throw new app_exception_1.BadRequestException("Login failed", 401);
    }
}
exports.default = new AuthService();
