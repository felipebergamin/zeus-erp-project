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

export interface GetBoletoByIDQuery {
  getBoletoComID: Boleto;
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
      carne {
        _id
      }
      cliente {
        _id
        nome
      }
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
        _id
        nome
      }
      createdAt
    }
    totalBoletos
  }
`;

export const GET_BOLETO_BY_ID_QUERY = gql`
  query getBoletoByID($id: Int!) {
    getBoletoComID(id: $id) {
      _id
      createdAt

      dataBaixa
      dataPagamento
      dataVencimento

      valorCobranca
      valorPago

      digitoNossoNumero
      nossoNumero

      baixado
      pago
      registrado

      enviarAtualizacaoValor
      enviarAtualizacaoVencimento
      enviarPedidoBaixa
      lock

      carne {
        _id
        descricao
      }
      cliente {
        _id
        nome
      }
      contaBancaria {
        _id
        nome
      }
      ocorrencias {
        _id
        agenciaCobradora
        bancoCobrador
        dataCredito
        dataHora
        dataOcorrenciaNoBanco
        idOcorrencia
        jurosMora
        motivosOcorrencia
        valorPago
        arquivoRetorno {
          _id
          nomeArquivo
        }
      }
    }
  }
`;

export const PEDIDO_BAIXA_MUTATION = gql`
  mutation enviarPedidoBaixa($boleto: Int!) {
    pedidoBaixa(boleto: $boleto)
  }
`;

export const CANCELAR_PEDIDO_BAIXA_MUTATION = gql`
  mutation cancelarPedidoBaixa($boleto: Int!) {
    cancelarPedidoBaixa(boleto: $boleto)
  }
`;
