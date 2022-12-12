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
exports.FuncionarioService = void 0;
const permissao_negada_error_1 = require("../exception/permissao_negada_error");
class FuncionarioService {
    constructor(_repositorioVeiculo, _repositorioFuncionario) {
        this._repositorioFuncionarios = _repositorioFuncionario;
        this._repositorioVeiculos = _repositorioVeiculo;
    }
    cadastrarVeiculoService(veiculo, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioVeiculos.cadastrarVeiculo(veiculo);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    consultarVeiculoIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioVeiculos.consultarVeiculoId(id);
        });
    }
    consultarVeiculoPlacaService(placa) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioVeiculos.consultarVeiculoPlaca(placa);
        });
    }
    removerVeiculoService(veiculo, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioVeiculos.removerVeiculo(veiculo.id);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    editarValorVeiculoService(id, novoValor, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioVeiculos.editarValorVeiculo(id, novoValor);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    listarVeiculosService() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._repositorioVeiculos.listarVeiculos();
        });
    }
    cadastrarFuncionarioService(novoFuncionario, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioFuncionarios.cadastrarFuncionario(novoFuncionario);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    removerFuncinarioService(id, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioFuncionarios.removerFuncionario(id);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    editarSalarioFuncionarioService(id, novoSalario, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioFuncionarios.editarSalarioFuncionario(id, novoSalario);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    editarTelefoneFuncionarioService(id, novoTelefone, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioFuncionarios.editarTelefoneFuncionario(id, novoTelefone);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    editarEnderecoFuncionarioService(id, novoEndereco, idFuncionario) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcionario = yield this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario);
            if (funcionario.isAdmin) {
                yield this._repositorioFuncionarios.editarEnderecoFuncionario(id, novoEndereco);
            }
            else {
                throw new permissao_negada_error_1.PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao');
            }
        });
    }
    consultarFuncionarioIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioFuncionarios.consultarFuncionarioId(id);
        });
    }
    consultarFuncionarioCPFService(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioFuncionarios.consultarFuncionarioCPF(cpf);
        });
    }
    listarFuncionariosService() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioFuncionarios.listarFuncionarios();
        });
    }
}
exports.FuncionarioService = FuncionarioService;
