import { AplicacaoError } from "./aplicacao_error";

export class CadastroError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    } 
}