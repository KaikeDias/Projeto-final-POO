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
const valor_invalido_error_1 = require("../exception/valor_invalido_error");
const atendente_1 = require("../model/atendente");
const gerente_1 = require("../model/gerente");
const veiculo_1 = require("../model/veiculo");
const database_repository_1 = __importDefault(require("../repostorios/database_repository"));
const repositorio_funcionarios_1 = require("../repostorios/repositorio_funcionarios");
const repositorio_veiculos_1 = require("../repostorios/repositorio_veiculos");
const funcionario_service_1 = require("../service/funcionario_service");
const input_utils_1 = require("../utils/input_utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let repositorio = yield database_repository_1.default.inicializar('./../../database/data.db');
    let veiculoRepositorio = new repositorio_veiculos_1.RepositorioVeiculos(repositorio.database);
    let funcionarioRepositorio = new repositorio_funcionarios_1.RepositorioFuncionarios(repositorio.database);
    let funcionarioService = new funcionario_service_1.FuncionarioService(veiculoRepositorio, funcionarioRepositorio);
    //console.log(await funcionarioService.listarFuncionariosService())
    let opcao;
    let escolha;
    do {
        console.log('\nBem vindo\n');
        console.log('===========================================================');
        console.log('Voce gostaria de trabalhar com funcionarios ou carros ??');
        console.log('Funcionarios (digite 1)');
        console.log('Carros (digite 2)');
        console.log('Sair (digite 0)');
        try {
            escolha = (0, input_utils_1.input)('Escolha: ');
            if (escolha == 1) {
                do {
                    console.log('=====================================================================');
                    console.log('\n1 - Cadastrar Funcionario 2 - Consultar Funcionario(ID) 3 - Consultar Funcionario(CPF)\n' +
                        '4 - Remover Funcionario 5 - Editar Telefone 6 - Editar Endereço\n' +
                        '7 - Editar Salario 8 - Listar Funcionarios 9 - Pegar Bonificaçao' +
                        ' 0 - Finalizar\n');
                    opcao = (0, input_utils_1.input)("Opção:");
                    switch (opcao) {
                        case '1':
                            yield cadastrarFuncionario();
                            break;
                        case '2':
                            yield consultarIdFuncionario();
                            break;
                        case '3':
                            yield consultarCpfFuncioanrio();
                            break;
                        case '4':
                            yield removerFuncionario();
                            break;
                        case '5':
                            yield editarTelefone();
                            break;
                        case '6':
                            yield editarEndereco();
                            break;
                        case '7':
                            yield editarSalario();
                            break;
                        case '8':
                            yield listarFuncionarios();
                            break;
                        case '9':
                            yield getBonificacao();
                            break;
                    }
                } while (opcao != 0);
            }
            else if (escolha == 2) {
                do {
                    console.log('=====================================================================');
                    console.log('\n1 - Cadastrar Veiculo 2 - Consultar Veiculo(ID) 3 - Consultar Veiculo(Placa)\n' +
                        '4 - Remover Veiculo 5 - Editar Valor 6 - Listar Veiculos\n' +
                        '0 - Finalizar \n');
                    opcao = (0, input_utils_1.input)("Opção:");
                    switch (opcao) {
                        case '1':
                            yield cadastrar_veiculo();
                            break;
                        case '2':
                            yield consultarVeiculoId();
                            break;
                        case '3':
                            yield consultarVeiculoPlaca();
                            break;
                        case '4':
                            yield removerVeiculo();
                            break;
                        case '5':
                            yield editarValorVeiculo();
                            break;
                        case '6':
                            yield listarVeiculos();
                            break;
                    }
                } while (opcao != 0);
            }
            else if (escolha == 0) {
                yield repositorio.finalizar();
            }
        }
        catch (error) {
            console.log(error.message);
        }
        (0, input_utils_1.inputAll)("Operação finalizada. Digite <enter>");
        console.clear();
    } while (escolha != "0");
    console.log("Aplicação encerrada");
    function cadastrar_veiculo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nCadastrar Veiculo\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite seu ID: ');
                let placa = (0, input_utils_1.input)('Placa do veiculo: ');
                let modelo = (0, input_utils_1.input)('Modelo do veiculo: ');
                let categoria = (0, input_utils_1.input)('Categoria do veiculo: ');
                let valor = (0, input_utils_1.lerValorMonetario)('Valor do veiculo: ');
                let quilometragem = (0, input_utils_1.lerNumero)('Quilometragem: ');
                let novoVeiculo = new veiculo_1.Veiculo(0, placa, modelo, quilometragem, categoria, valor);
                yield funcionarioService.cadastrarVeiculoService(novoVeiculo, idFuncionario);
                console.log('Veiculo cadastrado com sucesso!');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function consultarVeiculoId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nConsultar veiculo(ID)\n');
                let id = (0, input_utils_1.lerNumero)('Digite o id do veiculo que procura: ');
                let veiculo = yield funcionarioService.consultarVeiculoIdService(id);
                console.log('\nVeiculo correspondente ao ID inserido: \n');
                console.log(`ID: ${veiculo.id}`);
                console.log(`Modelo: ${veiculo.Modelo}`);
                console.log(`Valor: ${veiculo.Valor}`);
                console.log(`Categoria: ${veiculo.Categoria}`);
                console.log(`Placa: ${veiculo.Placa}`);
                console.log(`Quilometragem: ${veiculo.Quilometragem}`);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function consultarVeiculoPlaca() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nConsultar veiculo(Placa)\n');
                let placa = (0, input_utils_1.input)('Digite a placa do veiculo que procura: ');
                let veiculo = yield funcionarioService.consultarVeiculoPlacaService(placa);
                console.log('\nVeiculo correspondente à placa inserida: \n');
                console.log(`ID: ${veiculo.id}`);
                console.log(`Modelo: ${veiculo.Modelo}`);
                console.log(`Valor: ${veiculo.Valor}`);
                console.log(`Categoria: ${veiculo.Categoria}`);
                console.log(`Placa: ${veiculo.Placa}`);
                console.log(`Quilometragem: ${veiculo.Quilometragem}`);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function removerVeiculo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nRemover Veiculo\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                let idVeiculo = (0, input_utils_1.lerNumero)('Digite o ID do veiculo que deseja remover: ');
                yield funcionarioService.removerFuncinarioService(idVeiculo, idFuncionario);
                console.log('Veiculo removido com sucesso!');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function editarValorVeiculo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nEditar o Valor do Veiculo\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                let id = (0, input_utils_1.lerNumero)('Digite o id do veiculo: ');
                let novoValor = (0, input_utils_1.lerValorMonetario)('Digite o novo valor do veiculo: ');
                yield funcionarioService.editarValorVeiculoService(id, novoValor, idFuncionario);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function listarVeiculos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`\nLista de veiculos\n`);
                let veiculos = yield funcionarioService.listarVeiculosService();
                for (let veiculo of veiculos) {
                    console.log(`ID: ${veiculo.id}`);
                    console.log(`Modelo: ${veiculo.Modelo}`);
                    console.log(`Valor: ${veiculo.Valor}`);
                    console.log(`Categoria: ${veiculo.Categoria}`);
                    console.log(`Placa: ${veiculo.Placa}`);
                    console.log(`Quilometragem: ${veiculo.Quilometragem}`);
                    console.log('\n----------------------------------------\n');
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function cadastrarFuncionario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`\nCadastrar Funcionario\n`);
                let tipo = (0, input_utils_1.lerNumero)('O funcionario cadastrado é um Gerente(1) ou um Atendente(2): ');
                if (tipo == 1 || tipo == 2) {
                    let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                    let cpf = (0, input_utils_1.input)('Digite o cpf do funcionario: ');
                    let nome = (0, input_utils_1.input)('Digite o nome do funcionario: ');
                    let endereco = (0, input_utils_1.input)('Digite o endereco do funcionario: ');
                    let telefone = (0, input_utils_1.input)('Digite o telefone do funcionario: ');
                    let salario = (0, input_utils_1.lerValorMonetario)('Digite o salario do funcionario: ');
                    if (tipo == 1) {
                        let gerente = new gerente_1.Gerente(0, cpf, nome, endereco, telefone, salario);
                        yield funcionarioService.cadastrarFuncionarioService(gerente, idFuncionario);
                    }
                    else {
                        let atendente = new atendente_1.Atendente(0, cpf, nome, endereco, telefone, salario);
                        yield funcionarioService.cadastrarFuncionarioService(atendente, idFuncionario);
                    }
                }
                else {
                    throw new valor_invalido_error_1.ValorInvalidoError('\nERRO: A opcao digitada nao é valida\n');
                }
                console.log('Funcionario cadastrado com sucesso!');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function consultarIdFuncionario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nConsultar Funcionario(ID)\n');
                let id = (0, input_utils_1.lerNumero)('Digite o ID do funcionario: ');
                let funcionario = yield funcionarioService.consultarFuncionarioIdService(id);
                console.log('\nFuncionario correspondente ao ID inserido:\n');
                console.log(`ID: ${funcionario.id}`);
                console.log(`Nome: ${funcionario.nome}`);
                console.log(`CPF: ${funcionario.cpf}`);
                console.log(`Salario: ${funcionario.salario}`);
                console.log(`Telefone: ${funcionario.telefone}`);
                console.log(`Endereco: ${funcionario.endereco}`);
                console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function consultarCpfFuncioanrio() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nConsultar Funcionario(CPF)\n');
                let cpf = (0, input_utils_1.input)('Digite o CPF do funcionario: ');
                let funcionario = yield funcionarioService.consultarFuncionarioCPFService(cpf);
                console.log('\nFuncionario correspondente ao CPF inserido:\n');
                console.log(`ID: ${funcionario.id}`);
                console.log(`Nome: ${funcionario.nome}`);
                console.log(`CPF: ${funcionario.cpf}`);
                console.log(`Salario: ${funcionario.salario}`);
                console.log(`Telefone: ${funcionario.telefone}`);
                console.log(`Endereco: ${funcionario.endereco}`);
                console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function removerFuncionario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nRemover Funcionario\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID de funcionario: ');
                let id = (0, input_utils_1.lerNumero)('Digite o ID do funcionario: ');
                yield funcionarioService.removerFuncinarioService(id, idFuncionario);
                console.log('\nFuncionario removido com sucesso!\n');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function editarTelefone() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nEditar o Telefone do Funcionario\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                let id = (0, input_utils_1.lerNumero)('Digite o ID do funcionario: ');
                let novoTelefone = (0, input_utils_1.input)('Digite o novo telefone: ');
                yield funcionarioService.editarTelefoneFuncionarioService(id, novoTelefone, idFuncionario);
                console.log('\nTelefone alterado com sucesso!\n');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function editarEndereco() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nEditar o Endereco do Funcionario\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                let id = (0, input_utils_1.lerNumero)('Digite o ID do funcionario: ');
                let novoEndereco = (0, input_utils_1.input)('Digite o novo endereco: ');
                yield funcionarioService.editarEnderecoFuncionarioService(id, novoEndereco, idFuncionario);
                console.log('\nEndereco alterado com sucesso!\n');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function editarSalario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nEditar o Salario do Funcionario\n');
                let idFuncionario = (0, input_utils_1.lerNumero)('Digite o seu ID: ');
                let id = (0, input_utils_1.lerNumero)('Qual o ID do funcionario: ');
                let novoSalario = (0, input_utils_1.lerValorMonetario)('Digite o novo salario do funcionario: ');
                yield funcionarioService.editarSalarioFuncionarioService(id, novoSalario, idFuncionario);
                console.log('\nSalario alterado com sucesso!\n');
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function listarFuncionarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nLista de Funcionarios\n');
                let funcionarios = yield funcionarioService.listarFuncionariosService();
                for (let funcionario of funcionarios) {
                    console.log(`ID: ${funcionario.id}`);
                    console.log(`Nome: ${funcionario.nome}`);
                    console.log(`CPF: ${funcionario.cpf}`);
                    console.log(`Salario: ${funcionario.salario}`);
                    console.log(`Telefone: ${funcionario.telefone}`);
                    console.log(`Endereco: ${funcionario.endereco}`);
                    console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
                    console.log('\n----------------------------------------\n');
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    function getBonificacao() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('\nVer a Bonificacao do Funcionario\n');
                let id = (0, input_utils_1.lerNumero)('Digite o ID do funcionario: ');
                console.log(`\nA bonificação desse funcionario é: ${yield funcionarioService.getBonificacaoService(id)}\n`);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}))();
