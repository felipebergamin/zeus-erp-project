import gql from 'graphql-tag';

export interface AbrirInstalacaoInput {
  observacoesAtendente?: string;
  dataAgenda: Date;
  pontoAcesso: number;
  cobrado: boolean;
  valor?: number;
  modoPagamento?: string;
  observacoesPagamento?: string;
  tecnicoResponsavel?: number;
}

export const CREATE_INSTALACAO_MUTATION = gql`
  mutation abrirInstalacao($input: AbrirInstalacaoInput!) {
    abrirInstalacao(input: $input) {
      _id
      protocolo
    }
  }
`;
