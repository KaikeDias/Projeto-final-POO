"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerValorMonetario = exports.lerNumero = exports.input = exports.inputAll = void 0;
const numero_invalido_error_1 = require("../exception/numero_invalido_error");
const valor_invalido_error_1 = require("../exception/valor_invalido_error");
exports.inputAll = require('prompt-sync')();
function input(message) {
    let mensagem = (0, exports.inputAll)(message);
    if (mensagem == '') {
        throw new valor_invalido_error_1.ValorInvalidoError('\nERRO: Atributo vazio\n');
    }
    else {
        return mensagem;
    }
}
exports.input = input;
function lerNumero(message) {
    let numero = Number(input(message));
    if (isNaN(numero) || numero < 0) {
        throw new numero_invalido_error_1.NumeroInvalidoError('\nERRO: O valor digitado não é um número\n');
    }
    else {
        return numero;
    }
}
exports.lerNumero = lerNumero;
function lerValorMonetario(message) {
    let valor = Number(input(message));
    if (isNaN(valor) || valor <= 0) {
        throw new valor_invalido_error_1.ValorInvalidoError('\nERRO: Esse valor monetário é invalido\n');
    }
    else {
        return valor;
    }
}
exports.lerValorMonetario = lerValorMonetario;
