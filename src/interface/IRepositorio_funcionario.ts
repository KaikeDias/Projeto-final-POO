import { Funcionario } from "../model/funcionario";

export interface IRepositorioFuncionario {
    cadastrarFuncionario(funcionario: Funcionario): Promise<void>
    removerFuncionario(id: number): Promise<void>
    consultarFuncionarioId(id: number): Promise<Funcionario>
    consultarFuncionarioCPF(cpf: string): Promise<Funcionario>
    listarFuncionarios(): Promise<Funcionario[]>
    editarEnderecoFuncionario(id: number, novoEndereco: string): Promise<void>
    editarTelefoneFuncionario(id: number, novoTelefone: string): Promise<void>
    editarSalarioFuncionario(id: number, novoSalario: number): Promise<void>
}