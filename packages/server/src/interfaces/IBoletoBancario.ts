import { ICarne } from "./ICarne";
import { ICliente } from "./ICliente";
import { IContaBancaria } from "./IContaBancaria";
import { IOcorrenciaCNAB } from "./IOcorrenciaCNAB";

export interface IBoletoBancario {
  _id?: number;
  alteradoEm?: Date;
  baixado?: boolean;
  carne?: string|ICarne;
  cliente: string|ICliente;
  contaBancaria: string|IContaBancaria;
  criadoEm?: Date;
  dataBaixa?: Date;
  dataPagamento?: Date;
  dataVencimento: Date;
  digitoNossoNumero?: string;
  registrado?: boolean;
  enviarAtualizacaoValor?: boolean;
  enviarAtualizacaoVencimento?: boolean;
  enviarPedidoBaixa?: boolean;
  excluido?: boolean;
  excluidoEm?: Date;
  nossoNumero?: number;
  numeroBoleto?: number;
  ocorrencias?: IOcorrenciaCNAB[];
  pago?: boolean;
  valorCobranca: number;
  valorPago?: number;
}
