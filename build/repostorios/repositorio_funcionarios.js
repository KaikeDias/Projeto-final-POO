"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioFuncionarios = void 0;
const funcionario_inexistente_error_1 = require("../exception/funcionario_inexistente_error");
const funcionario_ja_cadastrado_error_1 = require("../exception/funcionario_ja_cadastrado_error");
const atendente_1 = require("../model/atendente");
const funcionario_1 = require("../model/funcionario");
const gerente_1 = require("../model/gerente");
class RepositorioFuncionarios {
    constructor(database) {
        this.database = database;
    }
    cadastrarFuncionario(funcionario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consultarFuncionarioCPF(funcionario.cpf);
                throw new funcionario_ja_cadastrado_error_1.FuncionarioJaCadastradoError('\nERRO: Esse funcionario ja está cadastrado\n');
            }
            catch (error) {
                if (error instanceof funcionario_inexistente_error_1.FuncionarioInexistenteError) {
                    yield this.database.exec(`INSERT INTO FUNCIONARIO(CPF, NOME, ENDERECO, TELEFONE, SALARIO, IS_ADMIN) VALUES ('${funcionario.cpf}', '${funcionario.nome}', '${funcionario.endereco}', '${funcionario.telefone}', ${funcionario.salario}, ${funcionario.isAdmin})`);
                }
                else {
                    console.log(error.message);
                }
            }
        });
    }
    removerFuncionario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`DELETE FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`);
        });
    }
    consultarFuncionarioId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.get(`SELECT * FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`);
            if (data == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Não existe um funcionario com esse id\n');
            }
            else {
                let funcionario = funcionario_1.Funcionario.fromMap(data);
                if (funcionario.isAdmin) {
                    let gerente = new gerente_1.Gerente(funcionario.id, funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario);
                    return gerente;
                }
                else {
                    let atendente = new atendente_1.Atendente(funcionario.id, funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario);
                    return atendente;
                }
            }
        });
    }
    consultarFuncionarioCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.get(`SELECT * FROM FUNCIONARIO WHERE CPF = '${cpf}'`);
            if (data == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Não existe um funcionario com esse cpf\n');
            }
            else {
                let funcionario = funcionario_1.Funcionario.fromMap(data);
                if (funcionario.isAdmin) {
                    let gerente = new gerente_1.Gerente(funcionario.id, funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario);
                    return gerente;
                }
                else {
                    let atendente = new atendente_1.Atendente(funcionario.id, funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario);
                    return atendente;
                }
            }
        });
    }
    listarFuncionarios() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.all(`SELECT * FROM FUNCIONARIO`);
            if (data == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Não há funcionarios cadastrados ainda\n');
            }
            else {
                let values = data;
                let lista = values.map((value) => funcionario_1.Funcionario.fromMap(value));
                return lista;
            }
        });
    }
    editarEnderecoFuncionario(id, novoEndereco) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this.consultarFuncionarioId(id);
            if (funcionario == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n');
            }
            else {
                yield this.database.exec(`UPDATE FUNCIONARIO SET ENDERECO = '${novoEndereco}' WHERE FUNCIONARIO_ID = ${id}`);
            }
        });
    }
    editarTelefoneFuncionario(id, novoTelefone) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this.consultarFuncionarioId(id);
            if (funcionario == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n');
            }
            else {
                yield this.database.exec(`UPDATE FUNCIONARIO SET TELEFONE = '${novoTelefone}' WHERE FUNCIONARIO_ID = ${id}`);
            }
        });
    }
    editarSalarioFuncionario(id, novoSalario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this.consultarFuncionarioId(id);
            if (funcionario == undefined) {
                throw new funcionario_inexistente_error_1.FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n');
            }
            else {
                yield this.database.exec(`UPDATE FUNCIONARIO SET SALARIO = ${novoSalario} WHERE FUNCIONARIO_ID = ${id}`);
            }
        });
    }
}
exports.RepositorioFuncionarios = RepositorioFuncionarios;
