import gql from 'graphql-tag';

export interface ListarContasBancarias {
  listBankAccounts: [{
    _id: number;
    nome: string;
    createdAt: string;
  }];
  totalBankAccounts: number;
}

export interface ContaBancariaInput {
  digitoAgencia: string;
  numeroAgencia: string;
  carteira: string;
  cedente: string;
  codigoCedente: string;
  digitoConta: string;
  numeroConta: string;
  multaDia: number;
  multaVencimento: number;
  nome: string;
  nossoNumero: number;
  proximaRemessa: number;
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

export const CRIAR_CONTA_BANCARIA_MUTATION = gql`
  mutation criarContaBancaria($input: ContaBancariaInput!) {
    createBankAccount(input: $input) {
      _id
      createdAt
    }
  }
`;
