import gql from 'graphql-tag';
import { Cliente } from '../../models/Cliente';

export interface ListarClientes {
  listCustomers: Cliente[];
  totalCustomers: number;
}

export interface GetClienteByIdQuery {
  getCustomerByID: Cliente;
  valorTotalMensalidadeCliente: number;
}

export interface ClienteInput {
  cpfCnpj: string;
  dataNascimento: string;
  nome: string;
  rgIe: string;
  tags: string;
  tipoPessoa: string;

  email: string;
  numeroCelular: string;
  telefoneFixo?: string;

  bairro: string;
  cep: string;
  cidade: string;
  complemento?: string;
  estado: string;
  latitude?: number;
  logradouro: string;
  longitude?: number;
  numero: number;

  autoBloquear?: boolean;
  contaBancaria: number;
  diaVencimento: number;
  observacoes?: string;
}

export interface CriarCliente {
  _id: number;
  nome: string;
  createdAt: string;
}

export interface CpfAlreadyExistsQuery {
  cpfCnpjAlreadyExists: boolean;
}

export interface BuscaClienteQuery {
  searchCustomer: Cliente[];
}

export interface ValorMensalidadeQuery {
  valorTotalMensalidadeCliente: number;
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

export const ADD_CLIENTE_MUTATION = gql`
  mutation novoCliente($input: ClienteInput!) {
    createCustomer(input: $input) {
      _id
      nome
      createdAt
    }
  }
`;

export const CPF_CNPJ_ALREADY_EXISTS_QUERY = gql`
  query cpfAleradyExists($cpfCnpj: String!) {
    cpfCnpjAlreadyExists(cpfCnpj: $cpfCnpj)
  }
`;

export const BUSCAR_CLIENTES = gql`
  query searchCliente($search: BuscaClienteInput!) {
    searchCustomer(values: $search) {
      _id
      nome
      cidade
    }
  }
`;

export const GET_CLIENTE_BY_ID = {
  BASIC_DATA: gql`
    query getById($id: Int!) {
      getCustomerByID(id: $id) {
        _id
        nome
        cpfCnpj
        diaVencimento
        contaBancaria {
          _id
          nome
        }
      }
      valorTotalMensalidadeCliente(clienteID: $id)
    }
  `,
  FULLDATA: gql`
    query getById($id: Int!) {
      getCustomerByID(id: $id) {
        _id

        cpfCnpj
        dataNascimento
        nome
        rgIe
        tags
        tipoPessoa

        email
        numeroCelular
        telefoneFixo

        bairro
        cep
        cidade
        complemento
        estado
        latitude
        logradouro
        longitude
        numero

        autoBloquear
        contaBancaria {
          _id
          nome
        }
        diaVencimento
        observacoes

        pontosDeAcesso {
          _id
        }

        createdAt
        updatedAt
        deletedAt
      }
      valorTotalMensalidadeCliente(clienteID: $id)
    }
  `,
};

export const VALOR_TOTAL_MENSALIDADE_QUERY = gql`
  query valorMensalidade($clienteID: Int!) {
    valorTotalMensalidadeCliente(clienteID: $clienteID)
  }
`;

export const UPDATE_CLIENTE_MUTATION = gql`
  mutation updateCliente($id: Int!, $input: ClienteInput!) {
    updateCustomer(id: $id, input: $input) {
      _id
      updatedAt
    }
  }
`;
