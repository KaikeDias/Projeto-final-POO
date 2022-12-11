import { Database } from "sqlite";
import { FuncionarioInexistenteError } from "../exception/funcionario_inexistente_error";
import { FuncionarioJaCadastradoError } from "../exception/funcionario_ja_cadastrado_error";
import { IRepositorioFuncionario } from "../interface/IRepositorio_funcionario";
import { Funcionario } from "../model/funcionario";

export class RepositorioFuncionarios implements IRepositorioFuncionario {
    database!: Database

    constructor(database: Database) {
        this.database = database
    }
    async cadastrarFuncionario(funcionario: Funcionario): Promise<void> {
        await this.database.exec(`INSERT INTO FUNCIONARIO(CPF, NOME, ENDERECO, TELEFONE, SALARIO, IS_ADMIN) VALUES ('${funcionario.cpf}', '${funcionario.nome}', '${funcionario.endereco}', '${funcionario.telefone}', ${funcionario.salario}, ${funcionario.isAdmin})`)
    }
    
    async removerFuncionario(id: number): Promise<void> {
        await this.database.exec(`DELETE FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`)
    }
    
    async consultarFuncionarioId(id: number): Promise<Funcionario> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`)
        
        if(data == undefined) {
            throw new FuncionarioInexistenteError('Não existe um funcionario com esse id')
        }else {
            let funcionario: Funcionario = Funcionario.fromMap(data)
            return funcionario
        }
    }

    async consultarFuncionarioCPF(cpf: string): Promise<Funcionario> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM FUNCIONARIO WHERE CPF = '${cpf}'`)

        if(data == undefined) {
            throw new FuncionarioInexistenteError('Não existe um funcionario com esse cpf')
        }else {
            let funcionario: Funcionario = Funcionario.fromMap(data)
            return funcionario
        }
    }

    async listarFuncionarios(): Promise<Funcionario[]> {
        let data: Object | undefined = await this.database.all(`SELECT * FROM FUNCIONARIO`)

        if(data == undefined) {
            throw new FuncionarioInexistenteError('Não há funcionarios cadastrados ainda')
        }else {
            let values = <Array<Object>> data

            let lista: Array<Funcionario> = values.map((value) => Funcionario.fromMap(value)) 

            return lista
        }
    }

    async editarEnderecoFuncionario(id: number, novoEndereco: string): Promise<void> {
        await this.database.exec(`UPDATE FUNCIONARIO SET ENDERECO = '${novoEndereco}' WHERE FUNCIONARIO_ID = ${id}`)
    }

    async editarTelefoneFuncionario(id: number, novoTelefone: string): Promise<void> {
        await this.database.exec(`UPDATE FUNCIONARIO SET TELEFONE = '${novoTelefone}' WHERE FUNCIONARIO_ID = ${id}`)
    }
    
    async editarSalarioFuncionario(id: number, novoSalario: number): Promise<void> {
        await this.database.exec(`UPDATE FUNCIONARIO SET SALARIO = ${novoSalario} WHERE FUNCIONARIO_ID = ${id}`)
    }
}