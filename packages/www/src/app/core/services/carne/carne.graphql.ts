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

export const CARNES_POR_CLIENTE_QUERY = {
  COM_BOLETOS: gql`
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
  `,
  SEM_BOLETOS: gql`
    query carnesPorCliente($cliente: Int!) {
      carnesPorCliente(cliente: $cliente) {
        _id
        descricao
      }
    }
  `,
};

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

export const ADD_BOLETO_AO_CARNE_MUTATION = gql`
  mutation atrelarBoletoCarne($boleto: Int!, $carne: Int!) {
    addBoletoAoCarne(boleto: $boleto, carne: $carne)
  }
`;

export const REMOVE_BOLETO_CARNE = gql`
  mutation atrelarBoletoCarne($boleto: Int!) {
    removeBoletoDoCarne(boleto: $boleto)
  }
`;
