import { NumeroInvalidoError } from "../exception/numero_invalido_error";
import { ValorInvalidoError } from "../exception/valor_invalido_error";

export var inputAll = require('prompt-sync')()

export function input(message: string): any {
    let mensagem = inputAll(message)

    if(mensagem == '') {
        throw new ValorInvalidoError('\nERRO: Atributo vazio\n')
    }else {
        return mensagem
    }
}

export function lerNumero(message: string): number {
    let numero = Number(input(message))

    if(isNaN(numero) || numero < 0) {
        throw new NumeroInvalidoError('\nERRO: O valor digitado não é um número\n')
    }else {
        return numero;
    }
}

export function lerValorMonetario(message: string): number {
    let valor = Number(input(message))

    if(isNaN(valor) || valor <= 0){
        throw new ValorInvalidoError('\nERRO: Esse valor monetário é invalido\n')
    }else {
        return valor;
    }
}