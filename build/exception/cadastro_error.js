"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroError = void 0;
const aplicacao_error_1 = require("./aplicacao_error");
class CadastroError extends aplicacao_error_1.AplicacaoError {
    constructor(message) {
        super(message);
    }
}
exports.CadastroError = CadastroError;
