import { ConsultaError } from "./consulta_error";

export class FuncionarioInexistenteError extends ConsultaError {
    constructor(message: string) {
        super(message)
    } 
}