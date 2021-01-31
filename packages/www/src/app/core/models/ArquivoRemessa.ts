import { ContaBancaria } from './ContaBancaria';

export class ArquivoRemessa {
  _id?: number;
  contaBancaria?: ContaBancaria;
  conteudoArquivo?: string;
  diaGeracao?: number;
  mesGeracao?: number;
  nomeArquivo?: string;
  quantidadeOperacoes?: number;
}
