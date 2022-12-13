"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputError = void 0;
const aplicacao_error_1 = require("./aplicacao_error");
class InputError extends aplicacao_error_1.AplicacaoError {
    constructor(message) {
        super(message);
    }
}
exports.InputError = InputError;
