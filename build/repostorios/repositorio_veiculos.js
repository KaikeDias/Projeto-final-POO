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
exports.RepositorioVeiculos = void 0;
const veiculo_inexistente_error_1 = require("../exception/veiculo_inexistente_error");
const veiculo_1 = require("../model/veiculo");
class RepositorioVeiculos {
    constructor(database) {
        this.database = database;
    }
    cadastrarVeiculo(veiculo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`INSERT INTO VEICULO(PLACA, MODELO, QUILOMETRAGEM, CATEGORIA, VALOR) VALUES('${veiculo.Placa}','${veiculo.Modelo}',${veiculo.Quilometragem},'${veiculo.Categoria}',${veiculo.Valor})`);
        });
    }
    removerVeiculo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`DELETE FROM VEICULO WHERE VEICULO_ID = ${id}`);
        });
    }
    consultarVeiculoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.get(`SELECT * FROM VEICULO WHERE VEICULO_ID = ${id}`);
            if (data == undefined) {
                throw new veiculo_inexistente_error_1.VeiculoInexistenteError('Não existe um veiculo com esse id');
            }
            else {
                let veiculo = veiculo_1.Veiculo.fromMap(data);
                return veiculo;
            }
        });
    }
    consultarVeiculoPlaca(placa) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.get(`SELECT * FROM VEICULO WHERE PLACA = '${placa}'`);
            if (data == undefined) {
                throw new veiculo_inexistente_error_1.VeiculoInexistenteError('Não existe um veiculo com essa placa');
            }
            else {
                let veiculo = veiculo_1.Veiculo.fromMap(data);
                return veiculo;
            }
        });
    }
    editarValorVeiculo(id, novoValor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.exec(`UPDATE VEICULO SET VALOR = ${novoValor} WHERE VEICULO_ID = ${id}`);
        });
    }
    listarVeiculos() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.database.all(`SELECT * FROM VEICULO`);
            if (data == undefined) {
                throw new veiculo_inexistente_error_1.VeiculoInexistenteError('Não há veiculos cadastrados ainda');
            }
            else {
                let values = data;
                let lista = values.map((value) => veiculo_1.Veiculo.fromMap(value));
                return lista;
            }
        });
    }
}
exports.RepositorioVeiculos = RepositorioVeiculos;
