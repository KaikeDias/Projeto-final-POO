"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cadastro_error_1 = require("./cadastro_error");
class AtributoVazioError extends cadastro_error_1.CadastroError {
    constructor(message) {
        super(message);
    }
}
