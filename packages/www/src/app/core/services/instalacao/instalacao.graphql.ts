import gql from 'graphql-tag';
import { Instalacao } from '../../models/Instalacao';

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

export interface ListarInstalacoesQuery {
  listarInstalacoes: Instalacao[];
  totalInstalacoes: number;
}

export const CREATE_INSTALACAO_MUTATION = gql`
  mutation abrirInstalacao($input: AbrirInstalacaoInput!) {
    abrirInstalacao(input: $input) {
      _id
      protocolo
    }
  }
`;

export const LISTAR_INSTALACOES_QUERY = gql`
  query listarInstalacoes($first: Int, $offset: Int) {
    totalInstalacoes
    listarInstalacoes(first: $first, offset: $offset) {
      _id
      dataAgenda
      protocolo
      atendente {
        _id
        nome
      }
      tecnicoResponsavel {
        _id
        nome
      }
      pontoAcesso {
        _id
        login
        logradouro
        numero
        cidade

        cliente {
          _id
          nome
        }
      }
    }
  }
`;
