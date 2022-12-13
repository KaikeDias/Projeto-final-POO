import { ValorInvalidoError } from "../exception/valor_invalido_error"
import { Atendente } from "../model/atendente"
import { Funcionario } from "../model/funcionario"
import { Gerente } from "../model/gerente"
import { Veiculo } from "../model/veiculo"
import DatabaseRepository from "../repostorios/database_repository"
import { RepositorioFuncionarios } from "../repostorios/repositorio_funcionarios"
import { RepositorioVeiculos } from "../repostorios/repositorio_veiculos"
import { FuncionarioService } from "../service/funcionario_service"
import { input,inputAll,lerNumero, lerValorMonetario} from "../utils/input_utils"

(async () => {
    let repositorio: DatabaseRepository = await DatabaseRepository.inicializar('./../../database/data.db')
    let veiculoRepositorio: RepositorioVeiculos = new RepositorioVeiculos(repositorio.database)
    let funcionarioRepositorio: RepositorioFuncionarios = new RepositorioFuncionarios(repositorio.database)
    let funcionarioService: FuncionarioService = new FuncionarioService(veiculoRepositorio, funcionarioRepositorio)

    let opcao;
    let escolha;

    do {
        console.log('\nBem vindo\n');
        console.log('\n===========================================================\n')
        console.log('Voce gostaria de trabalhar com funcionarios ou carros ??');
        console.log('Funcionarios (digite 1)');
        console.log('Carros (digite 2)');
        console.log('Sair (digite 0)');
        
        try {
            escolha = input('Escolha: ');

            if (escolha == 1) {
                do {
                    console.log('\n=====================================================================\n')
                    console.log('\n1 - Cadastrar Funcionario 2 - Consultar Funcionario(ID) 3 - Consultar Funcionario(CPF)\n' +
                        '4 - Remover Funcionario 5 - Editar Telefone 6 - Editar Endereço\n' +
                        '7 - Editar Salario 8 - Listar Funcionarios 9 - Pegar Bonificaçao\n' +
                        '0 - Finalizar\n');

                    opcao = input("Opção:");

                    switch (opcao) {
                        case '1':
                            await cadastrarFuncionario();
                            break

                        case '2':
                            await consultarIdFuncionario();
                            break

                        case '3':
                            await consultarCpfFuncioanrio();
                            break

                        case '4':
                            await removerFuncionario();
                            break

                        case '5':
                            await editarTelefone();
                            break
                            
                        case '6':
                            await editarEndereco();
                            break
                            
                        case '7':
                            await editarSalario();
                            break

                        case '8':
                            await listarFuncionarios();
                            break
                            
                        case '9':
                            await getBonificacao();
                            break

                    }
                }while(opcao != 0)
            } else if(escolha == 2) {
                do {
                    console.log('=====================================================================')
                    console.log('\n1 - Cadastrar Veiculo 2 - Consultar Veiculo(ID) 3 - Consultar Veiculo(Placa)\n' +
                        '4 - Remover Veiculo 5 - Editar Valor 6 - Listar Veiculos\n' +
                        '0 - Finalizar \n');

                    opcao = input("Opção: ");

                    switch (opcao) {
                        case '1':
                            await cadastrar_veiculo();
                            break

                        case '2':
                            await consultarVeiculoId();
                            break

                        case '3':
                            await consultarVeiculoPlaca();
                            break
                        case '4':
                            await removerVeiculo();
                            break
                        case '5':
                            await editarValorVeiculo();
                            break
                        case '6':
                            await listarVeiculos();
                            break
                    }
                }while(opcao != 0)
            } else if(escolha == 0) {
                await repositorio.finalizar()
            }
        } catch (error: any) {
            console.log(error.message)
        }

        inputAll("Operação finalizada. Digite <enter>");
        console.clear()
    } while (escolha != "0");
    console.log("Aplicação encerrada");


    async function cadastrar_veiculo() {
        try {
            console.log('\nCadastrar Veiculo\n');
            
            let idFuncionario:number = lerNumero('Digite seu ID: ');
            let placa: string = input('Placa do veiculo: ');
            let modelo : string = input('Modelo do veiculo: ');
            let categoria: string = input('Categoria do veiculo: ');
            let valor: number = lerValorMonetario('Valor do veiculo: ');
            let quilometragem: number = lerNumero('Quilometragem: ');
            let novoVeiculo: Veiculo = new Veiculo(0,placa,modelo,quilometragem,categoria,valor);

            await funcionarioService.cadastrarVeiculoService(novoVeiculo,idFuncionario);

            console.log('Veiculo cadastrado com sucesso!')
        } catch (error:any) {
            console.log(error.message);
        }
    }

    async function consultarVeiculoId(): Promise<void> {
        try {
            console.log('\nConsultar veiculo(ID)\n')
            
            let id = lerNumero('Digite o id do veiculo que procura: ')
            let veiculo: Veiculo = await funcionarioService.consultarVeiculoIdService(id)
            
            console.log('\nVeiculo correspondente ao ID inserido: \n')
            console.log(`ID: ${veiculo.id}`)
            console.log(`Modelo: ${veiculo.Modelo}`)
            console.log(`Valor: ${veiculo.Valor}`)
            console.log(`Categoria: ${veiculo.Categoria}`)
            console.log(`Placa: ${veiculo.Placa}`)
            console.log(`Quilometragem: ${veiculo.Quilometragem}`)
        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    async function consultarVeiculoPlaca(): Promise<void> {
        try {
            console.log('\nConsultar veiculo(Placa)\n')

            let placa = input('Digite a placa do veiculo que procura: ')
            let veiculo: Veiculo = await funcionarioService.consultarVeiculoPlacaService(placa)
            
            console.log('\nVeiculo correspondente à placa inserida: \n')
            console.log(`ID: ${veiculo.id}`)
            console.log(`Modelo: ${veiculo.Modelo}`)
            console.log(`Valor: ${veiculo.Valor}`)
            console.log(`Categoria: ${veiculo.Categoria}`)
            console.log(`Placa: ${veiculo.Placa}`)
            console.log(`Quilometragem: ${veiculo.Quilometragem}`)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function removerVeiculo(): Promise<void> {
        try {
            console.log('\nRemover Veiculo\n')

            let idFuncionario: number = lerNumero('Digite o seu ID: ')
            let idVeiculo: number = lerNumero('Digite o ID do veiculo que deseja remover: ')

            await funcionarioService.removerFuncinarioService(idVeiculo, idFuncionario)

            console.log('Veiculo removido com sucesso!')
        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    async function editarValorVeiculo(): Promise<void>{
        try {
            console.log('\nEditar o Valor do Veiculo\n')
            
            let idFuncionario:number = lerNumero('Digite o seu ID: ');
            let id:number = lerNumero('Digite o id do veiculo: ');
            let novoValor:number = lerValorMonetario('Digite o novo valor do veiculo: ')
            await funcionarioService.editarValorVeiculoService(id,novoValor,idFuncionario);
        } catch (error:any) {
            console.log(error.message);
        }
    }

    async function listarVeiculos(): Promise<void> {
        try {
            console.log(`\nLista de veiculos\n`)

            let veiculos: Veiculo[] = await funcionarioService.listarVeiculosService();

            for(let veiculo of veiculos) {
                console.log(`ID: ${veiculo.id}`)
                console.log(`Modelo: ${veiculo.Modelo}`)
                console.log(`Valor: ${veiculo.Valor}`)
                console.log(`Categoria: ${veiculo.Categoria}`)
                console.log(`Placa: ${veiculo.Placa}`)
                console.log(`Quilometragem: ${veiculo.Quilometragem}`)
                console.log('\n----------------------------------------\n')
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    async function cadastrarFuncionario(): Promise<void> {
        try {
            console.log(`\nCadastrar Funcionario\n`)

            let tipo: number = lerNumero('O funcionario cadastrado é um Gerente(1) ou um Atendente(2): ')

            if(tipo == 1 || tipo == 2) {
                let idFuncionario: number = lerNumero('Digite o seu ID: ')
                let cpf: string = input('Digite o cpf do funcionario: ')
                let nome: string = input('Digite o nome do funcionario: ')
                let endereco: string = input('Digite o endereco do funcionario: ')
                let telefone: string = input('Digite o telefone do funcionario: ')
                let salario: number = lerValorMonetario('Digite o salario do funcionario: ')
                
                if(tipo == 1) {
                    let gerente: Gerente = new Gerente(0,cpf,nome,endereco,telefone,salario);
                    await funcionarioService.cadastrarFuncionarioService(gerente, idFuncionario);
                }else {
                    let atendente: Atendente = new Atendente(0,cpf,nome,endereco,telefone,salario);
                    await funcionarioService.cadastrarFuncionarioService(atendente, idFuncionario);
                }
            }else {
                throw new ValorInvalidoError('\nERRO: A opcao digitada nao é valida\n');
            }

            console.log('Funcionario cadastrado com sucesso!');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async function consultarIdFuncionario(): Promise<void> {
        try {
            console.log('\nConsultar Funcionario(ID)\n');

            let id:number = lerNumero('Digite o ID do funcionario: ');
            let funcionario: Funcionario = await funcionarioService.consultarFuncionarioIdService(id);

            console.log('\nFuncionario correspondente ao ID inserido:\n');
            console.log(`ID: ${funcionario.id}`);
            console.log(`Nome: ${funcionario.nome}`);
            console.log(`CPF: ${funcionario.cpf}`);
            console.log(`Salario: ${funcionario.salario}`);
            console.log(`Telefone: ${funcionario.telefone}`);
            console.log(`Endereco: ${funcionario.endereco}`);
            console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
        } catch (error:any) {
            console.log(error.message);
        }
    }
    
    async function consultarCpfFuncioanrio(): Promise<void> {
        try {
            console.log('\nConsultar Funcionario(CPF)\n');

            let cpf:string = input('Digite o CPF do funcionario: ');
            let funcionario: Funcionario = await funcionarioService.consultarFuncionarioCPFService(cpf);

            console.log('\nFuncionario correspondente ao CPF inserido:\n')
            console.log(`ID: ${funcionario.id}`);
            console.log(`Nome: ${funcionario.nome}`);
            console.log(`CPF: ${funcionario.cpf}`);
            console.log(`Salario: ${funcionario.salario}`);
            console.log(`Telefone: ${funcionario.telefone}`);
            console.log(`Endereco: ${funcionario.endereco}`);
            console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
        } catch (error:any) {
            console.log(error.message);
        }
    }

    async function removerFuncionario(): Promise<void> {
        try {
            console.log('\nRemover Funcionario\n')

            let idFuncionario:number = lerNumero('Digite o seu ID de funcionario: ');
            let id:number = lerNumero('Digite o ID do funcionario: ')

            await funcionarioService.removerFuncinarioService(id,idFuncionario);

            console.log('\nFuncionario removido com sucesso!\n')
        } catch (error:any) {
            console.log(error.message)
        }
    }
    
    async function editarTelefone(): Promise<void> {
        try {
            console.log('\nEditar o Telefone do Funcionario\n');
            
            let idFuncionario: number = lerNumero('Digite o seu ID: ');
            let id: number = lerNumero('Digite o ID do funcionario: ');
            let novoTelefone: string = input('Digite o novo telefone: ');

            await funcionarioService.editarTelefoneFuncionarioService(id,novoTelefone,idFuncionario);

            console.log('\nTelefone alterado com sucesso!\n');
        } catch (error:any) {
            console.log(error.message);
        }
    }

    async function editarEndereco(): Promise<void> {
        try {
            console.log('\nEditar o Endereco do Funcionario\n');
            
            let idFuncionario: number = lerNumero('Digite o seu ID: ');
            let id: number = lerNumero('Digite o ID do funcionario: ');
            let novoEndereco: string = input('Digite o novo endereco: ');

            await funcionarioService.editarEnderecoFuncionarioService(id,novoEndereco, idFuncionario);

            console.log('\nEndereco alterado com sucesso!\n');
        } catch (error:any) {
            console.log(error.message);
        }
    }

    async function editarSalario(): Promise<void> {
        try {
            console.log('\nEditar o Salario do Funcionario\n');
            
            let idFuncionario: number = lerNumero('Digite o seu ID: ');
            let id:number = lerNumero('Qual o ID do funcionario: ');
            let novoSalario:number = lerValorMonetario('Digite o novo salario do funcionario: ');

            await funcionarioService.editarSalarioFuncionarioService(id,novoSalario,idFuncionario);

            console.log('\nSalario alterado com sucesso!\n');
        } catch (error:any) {
            console.log(error.message)
        }
    }

    async function listarFuncionarios(): Promise<void> {
        try {
            console.log('\nLista de Funcionarios\n')

            let funcionarios: Funcionario[] = await funcionarioService.listarFuncionariosService();

            for(let funcionario of funcionarios) {
                console.log(`ID: ${funcionario.id}`);
                console.log(`Nome: ${funcionario.nome}`);
                console.log(`CPF: ${funcionario.cpf}`);
                console.log(`Salario: ${funcionario.salario}`);
                console.log(`Telefone: ${funcionario.telefone}`);
                console.log(`Endereco: ${funcionario.endereco}`);
                console.log(`O funcionario é um administrador: ${funcionario.isAdmin}`);
                console.log('\n----------------------------------------\n')
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async function getBonificacao(): Promise<void> {
        try {
            console.log('\nVer a Bonificacao do Funcionario\n')

            let id:number = lerNumero('Digite o ID do funcionario: ')

            console.log(`\nA bonificação desse funcionario é: ${await funcionarioService.getBonificacaoService(id)}\n`)
        } catch (error:any) {
            console.log(error.message)
        }
    }
})()