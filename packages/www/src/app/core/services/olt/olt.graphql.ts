import gql from 'graphql-tag';
import { OLT } from '../../models/OLT';

export interface ListarOLTQuery {
  listarOLTs: OLT[];
  totalOlts: number;
}

export interface OLTInput {
  ip: string;
  nome: string;
  obs?: string;
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

export const CREATE_OLT_MUTATION = gql`
  mutation createOLT($input: OLTInput!) {
    createOLT(input: $input) {
      _id
      nome
      createdAt
    }
  }
`;
