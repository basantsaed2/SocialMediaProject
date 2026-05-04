"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
        status: err.statusCode,
        cause: err.cause
    });
};
exports.globalErrorHandler = globalErrorHandler;
