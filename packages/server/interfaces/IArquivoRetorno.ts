import { IBoletoBancario } from "./IBoletoBancario";
import { IContaBancaria } from "./IContaBancaria";
import { ITraillerRetorno } from "./ITraillerRetorno";
import { ITransactionRetorno } from "./ITransactionRetorno";

export interface IArquivoRetorno {
  criadoEm?: Date;
  registros?: [ITransactionRetorno];
  trailler?: ITraillerRetorno;

  contaBancaria: string|IContaBancaria;
  conteudoArquivo: string;
  dataGravacao: Date;
  nomeArquivo: string;
  quantidadeOperacoes: number;
}
