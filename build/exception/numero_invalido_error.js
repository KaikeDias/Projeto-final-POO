"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumeroInvalidoError = void 0;
const input_error_1 = require("./input_error");
class NumeroInvalidoError extends input_error_1.InputError {
    constructor(message) {
        super(message);
    }
}
exports.NumeroInvalidoError = NumeroInvalidoError;
