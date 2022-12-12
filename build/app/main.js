"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_repository_1 = __importDefault(require("../repostorios/database_repository"));
const repositorio_funcionarios_1 = require("../repostorios/repositorio_funcionarios");
const repositorio_veiculos_1 = require("../repostorios/repositorio_veiculos");
const funcionario_service_1 = require("../service/funcionario_service");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let repositorio = yield database_repository_1.default.inicializar('./../../database/data.db');
    let veiculoRepositorio = new repositorio_veiculos_1.RepositorioVeiculos(repositorio.database);
    let funcionarioRepositorio = new repositorio_funcionarios_1.RepositorioFuncionarios(repositorio.database);
    let funcionarioService = new funcionario_service_1.FuncionarioService(veiculoRepositorio, funcionarioRepositorio);
    // let veiculo: Veiculo = new Veiculo(0, 'xyz', 'civic', 10000, 'sedan', 50000)
    // let funcionario: Funcionario = new Funcionario(0, '545454', 'kelsu', 'dsdsds', '864587', 2000, true)
    // let escravo2: Funcionario = new Funcionario(0, '552255', 'romero', 'ldsds', '1121848', 500, false)
    // funcionarioRepositorio.cadastrarFuncionario(new Funcionario(0, '06050936366', 'kaike', 'avenida', '8699971731', 2000, true))
    yield funcionarioService.editarValorVeiculoService(3, 30000, 1);
    let result = yield funcionarioService.listarVeiculosService();
    console.log(result);
}))();
