import { AplicacaoError } from "./aplicacao_error";

export class PermissaoNegadaError extends AplicacaoError {
    constructor(message: string){
        super(message)
    }
}