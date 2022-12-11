"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioJaCadastradoError = void 0;
const consulta_error_1 = require("./consulta_error");
class FuncionarioJaCadastradoError extends consulta_error_1.ConsultaError {
    constructor(message) {
        super(message);
    }
}
exports.FuncionarioJaCadastradoError = FuncionarioJaCadastradoError;
