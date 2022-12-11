import { CadastroError } from "./cadastro_error";

class AtributoVazioError extends CadastroError {
    constructor(message: string) {
        super(message)
    } 
}