import gql from 'graphql-tag';
import { Cliente } from '../../models/Cliente';

export interface ListarClientes {
  listCustomers: Cliente[];
  totalCustomers: number;
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
