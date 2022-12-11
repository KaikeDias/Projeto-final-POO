"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeiculoJaCadastradoError = void 0;
const cadastro_error_1 = require("./cadastro_error");
class VeiculoJaCadastradoError extends cadastro_error_1.CadastroError {
    constructor(messagem) {
        super(messagem);
    }
}
exports.VeiculoJaCadastradoError = VeiculoJaCadastradoError;
