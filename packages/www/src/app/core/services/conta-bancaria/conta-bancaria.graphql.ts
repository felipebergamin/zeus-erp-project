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
  query listarContasBancarias($first: Int, $offset: Int, $nopaginate: Boolean) {
    listBankAccounts(first: $first, offset: $offset, nopaginate: $nopaginate) {
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

export const GET_CONTA_BANCARIA_BY_ID = gql`
  query contaBancariaByID($id: Int!) {
    getBankAccountByID(id: $id) {
      _id
      digitoAgencia
      numeroAgencia
      carteira
      cedente
      codigoCedente
      digitoConta
      numeroConta
      multaDia
      multaVencimento
      nome
      nossoNumero
      proximaRemessa
      version

      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CONTA_BANCARIA_MUTATION = gql`
  mutation updateCB($id: Int!, $input: ContaBancariaUpdateInput!) {
    updateBankAccount(id: $id, input: $input) {
      _id
      version
      updatedAt
    }
  }
`;

export const EXCLUIR_CONTA_BANCARIA_MUTATION = gql`
  mutation deleteBankAccount($id: Int!) {
    deleteBankAccount(id: $id)
  }
`;
