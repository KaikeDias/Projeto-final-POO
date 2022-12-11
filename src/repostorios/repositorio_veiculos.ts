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
        await this.database.exec(`INSERT INTO VEICULO(PLACA, MODELO, QUILOMETRAGEM, CATEGORIA, VALOR) VALUES('${veiculo.Placa}','${veiculo.Modelo}',${veiculo.Quilometragem},'${veiculo.Categoria}',${veiculo.Valor})`)
    }

    async removerVeiculo(id: number): Promise<void> {
        await this.database.exec(`DELETE FROM VEICULO WHERE VEICULO_ID = ${id}`)
    }

    async consultarVeiculoId(id: number): Promise<Veiculo> { 
        let data: Object | undefined = await this.database.get(`SELECT * FROM VEICULO WHERE VEICULO_ID = ${id}`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('Não existe um veiculo com esse id')
        }else {
            let veiculo: Veiculo = Veiculo.fromMap(data)
            return veiculo
        }
    }

    async consultarVeiculoPlaca(placa: string): Promise<Veiculo> {
        let data: Object | undefined = await this.database.get(`SELECT * FROM VEICULO WHERE PLACA = '${placa}'`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('Não existe um veiculo com essa placa')
        }else {
            let veiculo: Veiculo = Veiculo.fromMap(data)
            return veiculo
        }
    }

    async editarValorVeiculo(id: number, novoValor: number): Promise<void> {
        await this.database.exec(`UPDATE VEICULO SET VALOR = ${novoValor} WHERE VEICULO_ID = ${id}`)
    }

    async listarVeiculos(): Promise<Veiculo[]> {
        let data: Object | undefined = await this.database.all(`SELECT * FROM VEICULO`)

        if(data == undefined) {
            throw new VeiculoInexistenteError('Não há veiculos cadastrados ainda')
        }else {
            let values = <Array<Object>> data

            let lista: Array<Veiculo> = values.map((value) => Veiculo.fromMap(value)) 

            return lista
        }
    }
}