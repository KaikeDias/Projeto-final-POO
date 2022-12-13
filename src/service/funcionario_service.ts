import { PermissaoNegadaError } from "../exception/permissao_negada_error";
import { Atendente } from "../model/atendente";
import { Funcionario } from "../model/funcionario";
import { Gerente } from "../model/gerente";
import { Veiculo } from "../model/veiculo";
import { RepositorioFuncionarios } from "../repostorios/repositorio_funcionarios";
import { RepositorioVeiculos } from "../repostorios/repositorio_veiculos";

export class FuncionarioService {
    private _repositorioVeiculos: RepositorioVeiculos
    private _repositorioFuncionarios: RepositorioFuncionarios

    constructor(_repositorioVeiculo: RepositorioVeiculos, _repositorioFuncionario: RepositorioFuncionarios) {
        this._repositorioFuncionarios = _repositorioFuncionario;
        this._repositorioVeiculos = _repositorioVeiculo;
    }

    async cadastrarVeiculoService(veiculo: Veiculo, idFuncionario: number): Promise<void> {
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioVeiculos.cadastrarVeiculo(veiculo)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async consultarVeiculoIdService(id: number): Promise<Veiculo> {
        return await this._repositorioVeiculos.consultarVeiculoId(id);
    }

    async consultarVeiculoPlacaService(placa: string): Promise<Veiculo> {
        return await this._repositorioVeiculos.consultarVeiculoPlaca(placa)
    }

    async removerVeiculoService(idVeiculo: number, idFuncionario: number): Promise<void> {
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioVeiculos.removerVeiculo(idVeiculo)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async editarValorVeiculoService(id: number, novoValor: number, idFuncionario: number): Promise<void> {
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioVeiculos.editarValorVeiculo(id,novoValor)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async listarVeiculosService(): Promise<Veiculo[]> {
        return this._repositorioVeiculos.listarVeiculos()
    }

    async cadastrarFuncionarioService(novoFuncionario: Funcionario, idFuncionario: number): Promise<void> {
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioFuncionarios.cadastrarFuncionario(novoFuncionario)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async removerFuncinarioService(id: number, idFuncionario: number): Promise<void>{
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioFuncionarios.removerFuncionario(id)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async editarSalarioFuncionarioService(id: number, novoSalario: number, idFuncionario: number): Promise<void> {
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioFuncionarios.editarSalarioFuncionario(id,novoSalario)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async editarTelefoneFuncionarioService(id: number, novoTelefone: string, idFuncionario: number): Promise<void>{
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioFuncionarios.editarTelefoneFuncionario(id,novoTelefone)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }
    
    
    async editarEnderecoFuncionarioService(id: number, novoEndereco: string, idFuncionario: number): Promise<void>{
        let funcionario = await this._repositorioFuncionarios.consultarFuncionarioId(idFuncionario)

        if (funcionario.isAdmin) {
            await this._repositorioFuncionarios.editarEnderecoFuncionario(id,novoEndereco)
        } else {
            throw new PermissaoNegadaError('Esse funcionario nao tem permissao para executar essa funcao')
        }
    }

    async consultarFuncionarioIdService(id: number): Promise<Funcionario> {
        return await this._repositorioFuncionarios.consultarFuncionarioId(id)
    }

    async consultarFuncionarioCPFService(cpf: string): Promise<Funcionario> {
        return await this._repositorioFuncionarios.consultarFuncionarioCPF(cpf)
    }

    async listarFuncionariosService(): Promise<Funcionario[]> {
        return await this._repositorioFuncionarios.listarFuncionarios()
    }

    async getBonificacaoService(id: number): Promise<number> {
        let funcionario: Funcionario = await this.consultarFuncionarioIdService(id)

        return funcionario.getBonificacao()
    }
}