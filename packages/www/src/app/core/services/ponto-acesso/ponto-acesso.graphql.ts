import gql from 'graphql-tag';
import { PontoAcesso } from '../../models/PontoAcesso';

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

export interface PontoAcessoPorClienteQuery {
  pontoDeAcessoPorCliente: PontoAcesso[];
}

export interface BuscarPontosAcessoQuery {
  buscarPontosAcesso: PontoAcesso[];
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

export const PONTO_ACESSO_POR_CLIENTE_QUERY = gql`
  query pontoDeAcessoPorCliente($idCliente: Int!) {
    pontoDeAcessoPorCliente(idCliente: $idCliente) {
      _id
      login
      plano {
        _id
        nome
      }
      logradouro
      numero
    }
  }
`;

export const BUSCAR_PONTOS_ACESSO_QUERY = gql`
  query buscarPAs($searchValues: BuscarPontosAcesso!) {
    buscarPontosAcesso(searchVals: $searchValues) {
      _id
      login
      logradouro
      numero
      cliente {
        _id
        nome
      }
      plano {
        _id
        nome
      }
      cidade
      createdAt
    }
  }
`;

export const PA_BY_ID_QUERY = {
  BASIC_DATA: gql`
    query pontoAcessoById($id: Int!) {
      pontoDeAcessoPorID(id: $id) {
        _id
        login
        logradouro
        numero
        cidade
        createdAt
        cliente {
          _id
          nome
        }
      }
    }
  `,
  FULL_DATA: gql`
    query pontoAcessoById($id: Int!) {
      pontoDeAcessoPorID(id: $id) {
        _id

        autoAtrelarMac
        ipAddress
        login
        macAddress
        macOnu
        passwd
        ponNo
        slotNo
        incluirNaCobranca

        bairro
        cep
        cidade
        complemento
        estado
        latitude
        logradouro
        longitude
        numero

        olt {
          _id
          nome
        }
        plano {
          _id
          nome
        }
        pool {
          _id
          nome
        }
        cliente {
          _id
          nome
        }

        createdAt
        updatedAt
      }
    }
  `,
};

export const UPDATE_PA_MUTATION = gql`
  mutation updatePA($id: Int!, $input: UpdatePontoAcessoInput!) {
    updatePontoDeAcesso(id: $id, input: $input) {
      _id
      updatedAt
    }
  }
`;
