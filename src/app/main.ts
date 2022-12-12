import { Funcionario } from "../model/funcionario"
import { Veiculo } from "../model/veiculo"
import DatabaseRepository from "../repostorios/database_repository"
import { RepositorioFuncionarios } from "../repostorios/repositorio_funcionarios"
import { RepositorioVeiculos } from "../repostorios/repositorio_veiculos"
import { FuncionarioService } from "../service/funcionario_service"

(async () => {
    let repositorio: DatabaseRepository = await DatabaseRepository.inicializar('./../../database/data.db')
    let veiculoRepositorio: RepositorioVeiculos = new RepositorioVeiculos(repositorio.database)
    let funcionarioRepositorio: RepositorioFuncionarios = new RepositorioFuncionarios(repositorio.database)
    let funcionarioService: FuncionarioService = new FuncionarioService(veiculoRepositorio, funcionarioRepositorio)

    // let veiculo: Veiculo = new Veiculo(0, 'xyz', 'civic', 10000, 'sedan', 50000)
    // let funcionario: Funcionario = new Funcionario(0, '545454', 'kelsu', 'dsdsds', '864587', 2000, true)
    // let escravo2: Funcionario = new Funcionario(0, '552255', 'romero', 'ldsds', '1121848', 500, false)
    // funcionarioRepositorio.cadastrarFuncionario(new Funcionario(0, '06050936366', 'kaike', 'avenida', '8699971731', 2000, true))

    await funcionarioService.editarValorVeiculoService(3, 30000, 1)

    let result = await funcionarioService.listarVeiculosService()

    console.log(result)
})()