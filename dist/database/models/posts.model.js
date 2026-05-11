"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 1000
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.PostModel = mongoose_1.default.model("Post", postSchema);
