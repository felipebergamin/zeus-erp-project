import gql from 'graphql-tag';

export interface ListarContasBancarias {
  listBankAccounts: [{
    _id: number;
    nome: string;
    createdAt: string;
  }];
  totalBankAccounts: number;
}

export const LISTAR_CONTAS_BANCARIAS = gql`
  query listarContasBancarias($first: Int, $offset: Int, $excluded: Boolean, $nopaginate: Boolean) {
    listBankAccounts(first: $first, offset: $offset, excluded: $excluded, nopaginate: $nopaginate) {
      _id
      nome
      createdAt
    }
    totalBankAccounts
  }
`;
