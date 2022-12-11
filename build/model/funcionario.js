"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
class Funcionario {
    constructor(_id, _cpf, _nome, _endereco, _telefone, _salario, _isAdmin) {
        this._id = _id;
        this._cpf = _cpf;
        this._nome = _nome;
        this._endereco = _endereco;
        this._telefone = _telefone;
        this._salario = _salario;
        this._isAdmin = _isAdmin;
    }
    get id() {
        return this._id;
    }
    get cpf() {
        return this._cpf;
    }
    get nome() {
        return this._nome;
    }
    get endereco() {
        return this._endereco;
    }
    get telefone() {
        return this._telefone;
    }
    get salario() {
        return this._salario;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    getBonificacao() {
        return 0;
    }
    static fromMap(data) {
        let values = Object.values(data);
        let funcionario = new Funcionario(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
        return funcionario;
    }
}
exports.Funcionario = Funcionario;
