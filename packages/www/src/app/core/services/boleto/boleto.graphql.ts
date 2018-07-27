import gql from 'graphql-tag';
import { Boleto } from '../../models/Boleto';

export interface PesquisaBoletosQuery {
  pesquisarBoletos: Boleto[];
}

export interface BoletoInput {
  dataVencimento: Date;
  valorCobranca: number;
  contaBancaria: number;
  cliente: number;
  carne?: number;
}

export interface ListarBoletosQuery {
  listarBoletos: Boleto[];
  totalBoletos: number;
}

export const PESQUISA_BOLETOS_QUERY = gql`
  query pesquisaBoletos($search: PesquisaBoletoInput!) {
    pesquisarBoletos(searchVals: $search) {
      _id
      valorCobranca
      valorPago
      pago
      dataVencimento
      dataPagamento
    }
  }
`;

export const CRIAR_BOLETO_MUTATION = gql`
  mutation criarBoleto($input: BoletoInput!) {
    addBoleto(input: $input) {
      _id
      createdAt
    }
  }
`;

export const LISTAR_BOLETOS_QUERY = gql`
  query listarBoletos($first: Int, $offset: Int) {
    listarBoletos(first: $first, offset: $offset) {
      _id
      valorCobranca
      valorPago
      pago
      dataVencimento
      dataPagamento
      cliente{
        nome
      }
      createdAt
    }
    totalBoletos
  }
`;
