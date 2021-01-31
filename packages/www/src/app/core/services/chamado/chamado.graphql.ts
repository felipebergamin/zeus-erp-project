import gql from 'graphql-tag';

import { Chamado } from '../../models/Chamado';

export interface BuscarChamadosQuery {
  buscarChamados: Chamado[];
}

export interface AbrirChamadoInput {
  mensagem: string;
  motivoAbertura: string;
  pontoAcesso: number;
  prioridade: string;
  tecnico: number;
}

export interface ListarChamadosAbertos {
  listarChamadosAbertos: Chamado[];
  totalChamadosAbertos: number;
}

export interface CancelarChamadoInput {
  motivoCancelamento: string;
}

export const BUSCAR_CHAMADOS_QUERY = gql`
  query buscarChamados($searchValues: BuscarChamadosInput!) {
    buscarChamados(searchValues: $searchValues) {
      _id
      protocolo
      motivoAbertura
      sinalOnuAbertura
      prioridade
      pontoAcesso {
        _id
        login
      }
      abertoPor {
        _id
        login
      }

      finalizado
      cancelado
      createdAt
    }
  }
`;

export const ABRIR_CHAMADO_MUTATION = gql`
  mutation abrirChamado($input: AberturaChamadoInput!) {
    abrirChamado(input: $input) {
      _id
      protocolo
    }
  }
`;

export const LISTAR_CHAMADOS_ABERTOS = gql`
  query listarChamados($first: Int, $offset: Int) {
    listarChamadosAbertos(first: $first, offset: $offset) {
      _id
      protocolo
      motivoAbertura
      prioridade
      pontoAcesso {
        _id
        login
      }
      abertoPor {
        _id
        login
      }

      finalizado
      cancelado
      createdAt
    }
    totalChamadosAbertos
  }
`;

export const CANCELAR_CHAMADO_MUTATION = gql`
  mutation cancelarChamado($id: Int!, $input: CancelarChamadoInput!) {
    cancelarChamado(id: $id, input: $input) {
      _id
      cancelado
    }
  }
`;
