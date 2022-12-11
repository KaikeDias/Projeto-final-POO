import { ConsultaError } from "./consulta_error";

export class VeiculoInexistenteError extends ConsultaError {
    constructor(message: string) {
        super(message)
    }   
}