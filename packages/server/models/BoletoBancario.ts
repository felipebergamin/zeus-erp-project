import { Carne } from "./Carne";
import { Cliente } from "./Cliente";
import { ContaBancaria } from "./ContaBancaria";

export class BoletoBancario {
  public alteradoEm: Date;
  public carne: string|Carne;
  public cliente: string|Cliente;
  public contaBancaria: string|ContaBancaria;
  public criadoEm: Date;
  public dataPagamento: Date;
  public dataVencimento: Date;
  public enviadoRemessa: boolean;
  public excluido: boolean;
  public excluidoEm: Date;
  public ocorrencias: number[];
  public pago: boolean;
  public valorCobranca: number;
  public valorPago: number;
}
