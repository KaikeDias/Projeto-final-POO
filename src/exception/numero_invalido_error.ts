import { InputError } from "./input_error";

export class NumeroInvalidoError extends InputError {
    constructor(message: string) {
        super(message)
    } 
}