import { Veiculo } from "../model/veiculo";

export interface IRepositorioVeiculo {
    cadastrarVeiculo(veiculo: Veiculo): Promise<void>
    removerVeiculo(id: number): Promise<void>
    consultarVeiculoId(id: number): Promise<Veiculo>
    consultarVeiculoPlaca(placa: string): Promise<Veiculo>
    editarValorVeiculo(id: number, novoValor: number): Promise<void>
    listarVeiculos(): Promise<Veiculo[]>
}