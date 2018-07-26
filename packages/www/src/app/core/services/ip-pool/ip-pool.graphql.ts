import gql from 'graphql-tag';

import { IPPool } from '../../models/IPPool';

export interface ListarPoolsQuery {
  listarIPPools: IPPool[];
  totalIPPools: number;
}

export interface IPPoolInput {
  nome: string;
  cidr: string;
}

export const LISTAR_POOLS_QUERY = gql`
  query listarIPPools($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarIPPools(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
      cidr
    }
    totalIPPools
  }
`;

export const CRIAR_IP_POOL_MUTATION = gql`
  mutation criarPool($input: IPPoolInput!) {
    createIPPool(input: $input) {
      _id
      createdAt
    }
  }
`;
