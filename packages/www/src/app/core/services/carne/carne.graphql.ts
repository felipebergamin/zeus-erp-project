import gql from 'graphql-tag';
import { Carne } from '../../models/Carne';

export interface CarnesPorClienteQuery {
  carnesPorCliente: Carne[];
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
