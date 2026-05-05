"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => {
    return (req, res, next) => {
        console.log(Object.keys(schema));
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const values = schema[key].safeParse(req[key]);
            console.log(values);
        }
    };
};
exports.validation = validation;
