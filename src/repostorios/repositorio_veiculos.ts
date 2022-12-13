import { Database } from "sqlite";
import { isAnyArrayBuffer } from "util/types";
import { VeiculoInexistenteError } from "../exception/veiculo_inexistente_error";
import { VeiculoJaCadastradoError } from "../exception/veiculo_ja_cadastrado";
import { IRepositorioVeiculo } from "../interface/IRepositorio_veiculos";
import { Veiculo } from "../model/veiculo";

export class RepositorioVeiculos implements IRepositorioVeiculo {
    database!: Database

    constructor(database: Database){
        this.database = database
    }

    async cadastrarVeiculo(veiculo: Veiculo): Promise<void> {
        try {
            await this.consultarVeiculoPlaca(veiculo.Placa)
            throw new VeiculoJaCadastradoError('\nERRO: Esse veiculo já está cadastrado\n')
        } catch (error: any) {
            if(error instanceof VeiculoInexistenteError){
                await this.database.exec(`INSERT INTO VEICULO(PLACA, MODELO, QUILOMETRAGEM, CATEGORIA, VALOR) VALUES('${veiculo.Placa}','${veiculo.Modelo}',${veiculo.Quilometragem},'${veiculo.Categoria}',${veiculo.Valor})`)
            }else {
                console.log(error.message)
            }
        }
    }

    async removerVeiculo(id: number): Promise<void> {
        await this.database.exec(`DELETE FROM VEICULO WHERE VEICULO_ID = ${id}`)
    }

    async consultarVeiculoId(id: number): Promise<Veiculo> { 
        let data: Object | undefined = await this.database.get(`SELECT * FROM VEICULO WHERE VEICULO_ID = ${id}`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('\nERRO: Não existe um veiculo com esse id\n')
        }else {
            let veiculo: Veiculo = Veiculo.fromMap(data)
            return veiculo
        }
    }

    async consultarVeiculoPlaca(placa: string): Promise<Veiculo> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM VEICULO WHERE PLACA = '${placa}'`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('\nERRO: Não existe um veiculo com essa placa\n')
        }else {
            let veiculo: Veiculo = Veiculo.fromMap(data)
            return veiculo
        }
    }

    async editarValorVeiculo(id: number, novoValor: number): Promise<void> {
        let veiculo: Veiculo | undefined = await this.consultarVeiculoId(id)

        if(veiculo == undefined){
            throw new VeiculoInexistenteError('\nERRO: Não existe um veiculo com essa placa\n')
        }else {
            await this.database.exec(`UPDATE VEICULO SET VALOR = ${novoValor} WHERE VEICULO_ID = ${id}`)
        }
    }

    async listarVeiculos(): Promise<Veiculo[]> {
        let data: Object | undefined = await this.database.all(`SELECT * FROM VEICULO`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('\nERRO: Não há veiculos cadastrados ainda\n')
        }else {
            let values = <Array<Object>> data

            let lista: Array<Veiculo> = values.map((value) => Veiculo.fromMap(value)) 

            return lista
        }
    }
}