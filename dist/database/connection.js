"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const connectionDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.env.mongo_url);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.connectionDB = connectionDB;
