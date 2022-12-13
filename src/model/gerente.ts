import { Funcionario } from "./funcionario";
import { Veiculo } from "./veiculo";

export class Gerente extends Funcionario {
    constructor(_id: number ,_cpf: string, _nome: string, _endereco: string,_telefone: string, _salario: number, isAdmin: boolean = true) {
        super(_id,_cpf,_nome,_endereco, _telefone, _salario, isAdmin)
    }

    getBonificacao() {
        return this.salario * 1.6
    }
}