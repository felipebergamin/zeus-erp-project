import gql from 'graphql-tag';

import { Chamado } from '../../models/Chamado';

export interface BuscarChamadosQuery {
  buscarChamados: Chamado[];
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
