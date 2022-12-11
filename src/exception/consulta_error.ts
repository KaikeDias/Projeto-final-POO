import { AplicacaoError } from "./aplicacao_error";

export class ConsultaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    } 
}