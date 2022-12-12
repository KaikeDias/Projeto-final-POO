import { NumeroInvalidoError } from "../exception/numero_invalido_error";
import { ValorInvalidoError } from "../exception/valor_invalido_error";

export var input = require('prompt-sync')()

export function lerNumero(message: string): number {
    let numero = Number(input(message))

    if(isNaN(numero)) {
        throw new NumeroInvalidoError('O valor digitado não é um número')
    }else {
        return numero;
    }
}

export function lerValorMonetario(message: string): number {
    let valor = Number(input(message))

    if(isNaN(valor) || valor <= 0){
        throw new ValorInvalidoError('Esse valor monetário é invalido')
    }else {
        return valor;
    }
}