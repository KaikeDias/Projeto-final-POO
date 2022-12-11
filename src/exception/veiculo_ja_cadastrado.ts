import { CadastroError } from "./cadastro_error";

export class VeiculoJaCadastradoError extends CadastroError {
    constructor(messagem:string){
        super(messagem);
    }
}