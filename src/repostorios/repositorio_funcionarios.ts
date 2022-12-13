import { Database } from "sqlite";
import { FuncionarioInexistenteError } from "../exception/funcionario_inexistente_error";
import { FuncionarioJaCadastradoError } from "../exception/funcionario_ja_cadastrado_error";
import { IRepositorioFuncionario } from "../interface/IRepositorio_funcionario";
import { Atendente } from "../model/atendente";
import { Funcionario } from "../model/funcionario";
import { Gerente } from "../model/gerente";

export class RepositorioFuncionarios implements IRepositorioFuncionario {
    database!: Database

    constructor(database: Database) {
        this.database = database
    }

    async cadastrarFuncionario(funcionario: Funcionario): Promise<void> {
        try {
            await this.consultarFuncionarioCPF(funcionario.cpf)
            throw new FuncionarioJaCadastradoError('\nERRO: Esse funcionario ja está cadastrado\n')
        } catch (error: any) {
            if(error instanceof FuncionarioInexistenteError) {
                await this.database.exec(`INSERT INTO FUNCIONARIO(CPF, NOME, ENDERECO, TELEFONE, SALARIO, IS_ADMIN) VALUES ('${funcionario.cpf}', '${funcionario.nome}', '${funcionario.endereco}', '${funcionario.telefone}', ${funcionario.salario}, ${funcionario.isAdmin})`)
            }else{
                console.log(error.message)
            }
        }
    }
    
    async removerFuncionario(id: number): Promise<void> {
        await this.database.exec(`DELETE FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`)
    }
    
    async consultarFuncionarioId(id: number): Promise<Funcionario> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM FUNCIONARIO WHERE FUNCIONARIO_ID = ${id}`)
        
        if(data == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Não existe um funcionario com esse id\n')
        }else {
            let funcionario: Funcionario = Funcionario.fromMap(data)
            
            if(funcionario.isAdmin) {
                let gerente: Gerente = new Gerente(funcionario.id,funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario)

                return gerente
            }else {
                let atendente: Atendente = new Atendente(funcionario.id,funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario)

                return atendente
            }
        }
    }

    async consultarFuncionarioCPF(cpf: string): Promise<Funcionario> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM FUNCIONARIO WHERE CPF = '${cpf}'`)

        if(data == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Não existe um funcionario com esse cpf\n')
        }else {
            let funcionario: Funcionario = Funcionario.fromMap(data)
            if(funcionario.isAdmin) {
                let gerente: Gerente = new Gerente(funcionario.id,funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario)

                return gerente
            }else {
                let atendente: Atendente = new Atendente(funcionario.id,funcionario.cpf, funcionario.nome, funcionario.endereco, funcionario.telefone, funcionario.salario)

                return atendente
            }
        }
    }

    async listarFuncionarios(): Promise<Funcionario[]> {
        let data: Object | undefined = await this.database.all(`SELECT * FROM FUNCIONARIO`)

        if(data == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Não há funcionarios cadastrados ainda\n')
        }else {
            let values = <Array<Object>> data

            let lista: Array<Funcionario> = values.map((value) => Funcionario.fromMap(value)) 

            return lista
        }
    }

    async editarEnderecoFuncionario(id: number, novoEndereco: string): Promise<void> {
        let funcionario: Funcionario | undefined = await this.consultarFuncionarioId(id)

        if(funcionario == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n')
        }else {
            await this.database.exec(`UPDATE FUNCIONARIO SET ENDERECO = '${novoEndereco}' WHERE FUNCIONARIO_ID = ${id}`)
        }
    }

    async editarTelefoneFuncionario(id: number, novoTelefone: string): Promise<void> {
        let funcionario: Funcionario | undefined = await this.consultarFuncionarioId(id)

        if(funcionario == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n')
        }else {
            await this.database.exec(`UPDATE FUNCIONARIO SET TELEFONE = '${novoTelefone}' WHERE FUNCIONARIO_ID = ${id}`)
        }
    }
    
    async editarSalarioFuncionario(id: number, novoSalario: number): Promise<void> {
        let funcionario: Funcionario | undefined = await this.consultarFuncionarioId(id)

        if(funcionario == undefined) {
            throw new FuncionarioInexistenteError('\nERRO: Nao existe funcionário com esse ID\n')
        }else {
            await this.database.exec(`UPDATE FUNCIONARIO SET SALARIO = ${novoSalario} WHERE FUNCIONARIO_ID = ${id}`)
        }
    }
}