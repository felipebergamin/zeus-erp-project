import gql from 'graphql-tag';
import { Plano } from '../../models/Plano';

export interface ListarPlanosQuery {
  listarPlanos: Plano[];
}

export const LISTAR_PLANOS_QUERY = gql`
  query listarPlanos($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPlanos(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
    }
  }
`;
