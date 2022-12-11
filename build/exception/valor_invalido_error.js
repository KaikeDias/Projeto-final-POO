"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorInvalidoError = void 0;
const cadastro_error_1 = require("./cadastro_error");
class ValorInvalidoError extends cadastro_error_1.CadastroError {
    constructor(message) {
        super(message);
    }
}
exports.ValorInvalidoError = ValorInvalidoError;
