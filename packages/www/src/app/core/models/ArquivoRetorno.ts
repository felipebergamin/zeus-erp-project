import { ContaBancaria } from './ContaBancaria';

export class ArquivoRetorno {
  _id?: number;

  contaBancaria?: ContaBancaria;
  dataGravacao?: Date; // informação no header do arquivo
  nomeArquivo?: string;
  processado?: boolean;
  quantidadeOperacoes?: number;

  /* informações no registro trailler do arquivo */
  qtdeRegistrosConfirmados?: number;
  valorRegistrosConfirmados?: number;
  valorRegistrosLiquidados?: number;
  qtdeRegistrosLiquidados?: number;
  valorRegistros06?: number;
  qtdeRegistrosBaixados?: number;
  valorRegistrosBaixados?: number;
  qtdeRegistrosVencimentoAlterado?: number;
  valorRegistrosVencimentoAlterado?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
