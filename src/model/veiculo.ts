export class Veiculo {
    private _id: number
    private _placa: string
    private _modelo: string
    private _quilometragem: number
    private _categoria: string
    private _valor: number

    constructor(_id: number,_placa: string, _modelo: string,_quilometragem: number, _categoria: string, _valor: number) {
        this._id = _id
        this._placa = _placa
        this._modelo = _modelo
        this._quilometragem = _quilometragem
        this._categoria = _categoria
        this._valor = _valor
    }

    get Placa() {
        return this._placa;
    }

    get Modelo() {
        return this._modelo;
    }

    get Quilometragem() {
        return this._quilometragem;
    }

    get Categoria() {
        return this._categoria;
    }

    get Valor() {
        return this._valor
    }

    get id() {
        return this._id
    }

    static fromMap(data: Object): Veiculo {
        let values: any[] = Object.values(data)
        let veiculo: Veiculo = new Veiculo(values[0], values[1], values[2], values[3], values[4], values[5])

        return veiculo
    } 
}