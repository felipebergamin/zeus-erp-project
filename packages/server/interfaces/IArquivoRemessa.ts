import { IContaBancaria } from "../interfaces/IContaBancaria";

export interface IArquivoRemessa {
  _id: string;
  contaBancaria: string|IContaBancaria;
  conteudoArquivo: string;
  criadoEm: Date;
  diaGeracao: number;
  mesGeracao: number;
  nome: string;
  quantidadeOperacoes: number;
}
