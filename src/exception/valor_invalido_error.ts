import { CadastroError } from "./cadastro_error";

export class ValorInvalidoError extends CadastroError {
    constructor(message: string) {
        super(message)
    }
}