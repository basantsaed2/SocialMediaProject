"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const SuccessResponse = ({ res, status = 200, message = "Success", data = null }) => {
    return res.status(status).json({ message, data });
};
exports.SuccessResponse = SuccessResponse;
