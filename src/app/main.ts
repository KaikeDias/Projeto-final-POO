import { mainModule } from "process"
import { Funcionario } from "../model/funcionario"
import { Veiculo } from "../model/veiculo"
import DatabaseRepository from "../repostorios/database_repository"
import { RepositorioFuncionarios } from "../repostorios/repositorio_funcionarios"
import { RepositorioVeiculos } from "../repostorios/repositorio_veiculos"
import { FuncionarioService } from "../service/funcionario_service"
import { input } from "../utils/input_utils"

(async () => {
    let repositorio: DatabaseRepository = await DatabaseRepository.inicializar('./../../database/data.db')
    let veiculoRepositorio: RepositorioVeiculos = new RepositorioVeiculos(repositorio.database)
    let funcionarioRepositorio: RepositorioFuncionarios = new RepositorioFuncionarios(repositorio.database)
    let funcionarioService: FuncionarioService = new FuncionarioService(veiculoRepositorio, funcionarioRepositorio)
    
    
})()




