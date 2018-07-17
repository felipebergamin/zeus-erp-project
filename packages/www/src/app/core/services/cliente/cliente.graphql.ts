import gql from 'graphql-tag';
import { Cliente } from '../../models/Cliente';

export interface ListarClientes {
  listCustomers: Cliente[];
  totalCustomers: number;
}

export const LISTAR_CLIENTES = gql`
  query listarUsuarios($first: Int!, $offset: Int!, $excluded: Boolean!) {
    listCustomers(first: $first, offset: $offset, excluded: $excluded) {
      _id
      nome
      cidade
    }
    totalCustomers
  }
`;
