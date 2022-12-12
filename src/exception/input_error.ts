import { AplicacaoError } from "./aplicacao_error";

export class InputError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    } 
}