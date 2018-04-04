import { IContaBancaria } from "./IContaBancaria";

export interface IArquivoRetorno {
  contaBancaria: string|IContaBancaria;
  conteudoArquivo: string;
  dataGravacao: Date;

  criadoEm: Date;
}
