"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const app_exception_1 = require("../common/exceptions/app.exception");
const validation = (schema) => {
    return (req, res, next) => {
        let validationError = [];
        for (let key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            let values = schema[key].safeParse(req[key]);
            if (!values.success) {
                validationError.push({ key, value: values.error.issue });
            }
        }
        if (validationError.length > 0) {
            throw new app_exception_1.BadRequestException("Validation error", validationError);
        }
        next();
    };
};
exports.validation = validation;
