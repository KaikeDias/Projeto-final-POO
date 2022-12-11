import { ConsultaError } from "./consulta_error";

export class FuncionarioJaCadastradoError extends ConsultaError {
    constructor(message: string) {
        super(message)
    } 
}