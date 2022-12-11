import { Funcionario } from "../model/funcionario"
import { Veiculo } from "../model/veiculo"
import DatabaseRepository from "../repostorios/database_repository"
import { RepositorioFuncionarios } from "../repostorios/repositorio_funcionarios"
import { RepositorioVeiculos } from "../repostorios/repositorio_veiculos"

(async () => {
    let repositorio: DatabaseRepository = await DatabaseRepository.inicializar('./../../database/data.db')
    let veiculoRepositorio: RepositorioVeiculos = new RepositorioVeiculos(repositorio.database)
    let funcionarioRepositorio: RepositorioFuncionarios = new RepositorioFuncionarios(repositorio.database)

    let veiculo: Veiculo = new Veiculo(2, 'odv', 's10', 1000, 'sedan', 20000)

    let result = await funcionarioRepositorio.listarFuncionarios()

    console.log(result)
})()