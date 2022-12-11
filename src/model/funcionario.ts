export class Funcionario {
    private _id: number
    private _cpf: string
    private _nome: string
    private _endereco: string
    private _telefone: string
    private _salario: number
    private _isAdmin: boolean

    constructor(_id: number,_cpf: string, _nome: string, _endereco: string, _telefone: string, _salario: number, _isAdmin: boolean) {
        this._id = _id
        this._cpf = _cpf
        this._nome = _nome
        this._endereco = _endereco
        this._telefone = _telefone
        this._salario = _salario
        this._isAdmin = _isAdmin
    }

    get id() {
        return this._id
    }

    get cpf(){
        return this._cpf
    }

    get nome(){
        return this._nome
    }

    get endereco(){
        return this._endereco
    }

    get telefone(){
        return this._telefone
    }

    get salario() {
        return this._salario;
    }

    get isAdmin() {
        return this._isAdmin
    }

    getBonificacao(): number {
        return 0
    }

    static fromMap(data: Object): Funcionario {
        let values: any[] = Object.values(data)
        let funcionario: Funcionario = new Funcionario(values[0], values[1], values[2], values[3], values[4], values[5], values[6])

        return funcionario
    } 
}