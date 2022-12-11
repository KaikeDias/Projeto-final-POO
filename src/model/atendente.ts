import { Funcionario } from "./funcionario";
import { Veiculo } from "./veiculo";

export class Atendente extends Funcionario {
    constructor( _id: number,_cpf: string, _nome: string, _endereco: string,_telefone: string, _salario: number, isAdmin: boolean) {
        super( _id, _cpf, _nome, _endereco, _telefone, _salario, isAdmin);
    }

    getBonificacao(): number {
        return this.salario * 1.2
    }
}