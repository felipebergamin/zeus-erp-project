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

export const BUSCAR_CHAMADOS_QUERY = gql`
  query buscarChamados($searchValues: BuscarChamadosInput!) {
    buscarChamados(searchValues: $searchValues) {
      _id
      createdAt
      motivoAbertura
      finalizadoEm
      tecnico {
        _id
        nome
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
    }
  }
`;
