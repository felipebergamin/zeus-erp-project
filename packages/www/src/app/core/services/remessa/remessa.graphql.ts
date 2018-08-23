import gql from 'graphql-tag';

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

export const GERAR_REMESSA_MUTATION = gql`
  mutation gerarRemessa($input: GerarArquivoRemessaInput!) {
    gerarArquivoRemessa(input: $input) {
      _id
      quantidadeOperacoes
      nomeArquivo
    }
  }
`;
