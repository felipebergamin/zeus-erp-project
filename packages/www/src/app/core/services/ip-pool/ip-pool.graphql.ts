import gql from 'graphql-tag';

import { IPPool } from '../../models/IPPool';

export interface ListarPoolsQuery {
  listarIPPools: IPPool[];
}

export const LISTAR_POOLS_QUERY = gql`
  query listarIPPools($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarIPPools(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
      cidr
    }
  }
`;
