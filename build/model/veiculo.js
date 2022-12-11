"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veiculo = void 0;
class Veiculo {
    constructor(_id, _placa, _modelo, _quilometragem, _categoria, _valor) {
        this._id = _id;
        this._placa = _placa;
        this._modelo = _modelo;
        this._quilometragem = _quilometragem;
        this._categoria = _categoria;
        this._valor = _valor;
    }
    get Placa() {
        return this._placa;
    }
    get Modelo() {
        return this._modelo;
    }
    get Quilometragem() {
        return this._quilometragem;
    }
    get Categoria() {
        return this._categoria;
    }
    get Valor() {
        return this._valor;
    }
    get id() {
        return this._id;
    }
    static fromMap(data) {
        let values = Object.values(data);
        let veiculo = new Veiculo(values[0], values[1], values[2], values[3], values[4], values[5]);
        return veiculo;
    }
}
exports.Veiculo = Veiculo;
