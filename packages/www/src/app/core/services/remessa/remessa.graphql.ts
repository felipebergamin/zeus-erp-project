import gql from 'graphql-tag';
import { ArquivoRemessa } from '../../models/ArquivoRemessa';

export interface GerarRemessaInput {
  contaBancaria: number;

  dataInicio: Date;
  dataFim: Date;
  cliente: number;
  enviarPedidoBaixa: boolean;
  enviarAtualizacaoValor: boolean;
  enviarAtualizacaoVencimento: boolean;
  reenviarRemetidos: boolean;
}

export interface ListarArquivosRemessaQuery {
  listarArquivosRemessa: ArquivoRemessa[];
  totalArquivosRemessa: number;
}

export const GERAR_REMESSA_MUTATION = gql`
  mutation gerarRemessa($input: GerarArquivoRemessaInput!) {
    gerarArquivoRemessa(input: $input) {
      _id
      quantidadeOperacoes
      nomeArquivo
    }
  }
`;

export const LISTAR_REMESSAS_QUERY = gql`
  query listarRemessas($first: Int, $offset: Int) {
    listarArquivosRemessa(first: $first, offset: $offset) {
      _id
      nomeArquivo
      quantidadeOperacoes
      contaBancaria {
        nome
      }
      createdAt
    }
    totalArquivosRemessa
  }
`;
