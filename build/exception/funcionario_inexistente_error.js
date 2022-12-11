"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioInexistenteError = void 0;
const consulta_error_1 = require("./consulta_error");
class FuncionarioInexistenteError extends consulta_error_1.ConsultaError {
    constructor(message) {
        super(message);
    }
}
exports.FuncionarioInexistenteError = FuncionarioInexistenteError;
