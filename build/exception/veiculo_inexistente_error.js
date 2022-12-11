"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeiculoInexistenteError = void 0;
const consulta_error_1 = require("./consulta_error");
class VeiculoInexistenteError extends consulta_error_1.ConsultaError {
    constructor(message) {
        super(message);
    }
}
exports.VeiculoInexistenteError = VeiculoInexistenteError;
