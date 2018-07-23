import gql from 'graphql-tag';

export interface ListaPontosAcesso {
  listarPontosDeAcesso: [{
    _id: number;
    login: string;
    cliente: {
      _id: number;
      nome: string;
    }
  }];
  totalPontosDeAcesso: number;
}

export interface CreatePontoAcessoInput {
  autoAtrelarMac?: boolean;
  ipAddress?: string;
  login: string;
  macAddress?: string;
  macOnu?: string;
  passwd: string;
  ponNo?: string;
  slotNo?: string;
  incluirNaCobranca?: boolean;

  bairro: string;
  cep: string;
  cidade: string;
  complemento?: string;
  estado: string;
  latitude?: number;
  logradouro: string;
  longitude?: number;
  numero: string;

  olt?: number;
  plano: number;
  pool?: number;
  cliente: number;
}

export interface LoginExistsQuery {
  loginAlreadyExists: boolean;
}

export const CREATE_PA_MUTATION = gql`
  mutation createPA($input: CreatePontoAcessoInput!) {
    addPontoDeAcesso(input: $input) {
      _id
      createdAt
    }
  }
`;

export const LISTAR_PONTOS_ACESSO = gql`
  query listarPAs($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPontosDeAcesso(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      login
      plano {
        nome
      }
      cliente {
        _id
        nome
      }
    }
    totalPontosDeAcesso
  }
`;

export const LOGIN_EXISTS_QUERY = gql`
  query loginExists($login: String!) {
    loginAlreadyExists(login: $login)
  }
`;
