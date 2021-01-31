import { Cliente } from './Cliente';
import { ContaBancaria } from './ContaBancaria';
import { OcorrenciaBancaria } from './OcorrenciaBancaria';
import { Carne } from './Carne';

export class Boleto {
  _id?: number;
  baixado?: boolean;
  carne?: Carne;
  cliente?: Cliente;
  contaBancaria?: ContaBancaria;
  dataBaixa?: Date;
  dataCredito?: Date;
  dataPagamento?: Date;
  dataVencimento?: Date;
  digitoNossoNumero?: string;
  registrado?: boolean;
  enviarAtualizacaoValor?: boolean;
  enviarAtualizacaoVencimento?: boolean;
  enviarPedidoBaixa?: boolean;
  nossoNumero?: number;
  numeroBoleto?: number;
  ocorrencias?: OcorrenciaBancaria[];
  pago?: boolean;
  valorCobranca?: number;
  valorPago?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
