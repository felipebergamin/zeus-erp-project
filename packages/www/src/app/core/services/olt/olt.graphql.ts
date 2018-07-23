import gql from 'graphql-tag';
import { OLT } from '../../models/OLT';

export interface ListarOLTQuery {
  listarOLTs: OLT[];
  totalOlts: number;
}

export const LISTAR_OLT_QUERY = gql`
  query listarOlts($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarOLTs(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      ip
      nome
      createdAt
    }
    totalOlts
  }
`;
