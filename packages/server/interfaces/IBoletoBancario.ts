import { ICarne } from "./ICarne";
import { ICliente } from "./ICliente";
import { IContaBancaria } from "./IContaBancaria";

export interface IBoletoBancario {
  _id: string;
  alteradoEm: Date;
  carne: string|ICarne;
  cliente: string|ICliente;
  contaBancaria: string|IContaBancaria;
  criadoEm: Date;
  dataPagamento: Date;
  dataVencimento: Date;
  enviadoRemessa: boolean;
  excluido: boolean;
  excluidoEm: Date;
  numeroBoleto: number;
  ocorrencias: number[];
  pago: boolean;
  valorCobranca: number;
  valorPago: number;
}
