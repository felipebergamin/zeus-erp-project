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

export const BUSCAR_CHAMADOS_QUERY = gql`
  query buscarChamados($searchValues: BuscarChamadosInput!) {
    buscarChamados(searchValues: $searchValues) {
      _id
      createdAt
      motivoAbertura
      finalizadoEm
      abertoPor {
        login
      }
      tecnico {
        _id
        login
      }
      problema {
        descricao
      }
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
        login
      }
      abertoPor {
        login
      }

      finalizado
      cancelado
      createdAt
    }
    totalChamadosAbertos
  }
`;
