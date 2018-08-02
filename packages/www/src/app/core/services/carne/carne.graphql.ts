import gql from 'graphql-tag';
import { Carne } from '../../models/Carne';

export interface CarnesPorClienteQuery {
  carnesPorCliente: Carne[];
}

export interface AddCarneInput {
  cliente: number;
  descricao: string;

  parcelas: number;
  valorParcelas: number;
  primeiroVencimento: Date;
}

export const CARNES_POR_CLIENTE_QUERY = gql`
  query carnesPorCliente($cliente: Int!) {
    carnesPorCliente(cliente: $cliente) {
      _id
      descricao
      boletos {
        _id
        dataVencimento
        dataPagamento
        pago
        registrado
        valorCobranca
        valorPago
      }
    }
  }
`;

export const ADD_CARNE_MUTATION = gql`
  mutation addCarne($input: CreateCarneInput!) {
    addCarne(input: $input) {
      _id
      descricao
      boletos {
        _id
        dataVencimento
        valorCobranca
        pago
        valorPago
      }
    }
  }
`;
