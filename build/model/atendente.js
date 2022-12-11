"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atendente = void 0;
const funcionario_1 = require("./funcionario");
class Atendente extends funcionario_1.Funcionario {
    constructor(_id, _cpf, _nome, _endereco, _telefone, _salario, isAdmin) {
        super(_id, _cpf, _nome, _endereco, _telefone, _salario, isAdmin);
    }
    getBonificacao() {
        return this.salario * 1.2;
    }
}
exports.Atendente = Atendente;
