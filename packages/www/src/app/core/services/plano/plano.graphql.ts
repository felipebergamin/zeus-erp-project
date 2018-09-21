import gql from 'graphql-tag';
import { Plano } from '../../models/Plano';

export interface ListarPlanosQuery {
  listarPlanos: Plano[];
  totalPlanos: number;
}

export interface PlanoInput {
  descricao?: string;
  nome: string;
  valorMensal: number;
  velocidadeDownload: number;
  velocidadeUpload: number;
}

export const LISTAR_PLANOS_QUERY = gql`
  query listarPlanos($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPlanos(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
      valorMensal
      createdAt
    }
    totalPlanos
  }
`;

export const CREATE_PLANO_MUTATION = gql`
  mutation createPlano($input: PlanoInput!) {
    createPlano(input: $input) {
      _id
      createdAt
    }
  }
`;

export const GET_PLANO_BY_ID = gql`
  query getPlanoByID($id: Int!) {
    getPlanoByID(id: $id) {
      _id
      descricao
      nome
      valorMensal
      velocidadeDownload
      velocidadeUpload
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PLANO_MUTATION = gql`
  mutation updatePlano($id: Int!, $input: PlanoInput!) {
    updatePlano(id: $id, input: $input) {
      _id
      updatedAt
    }
  }
`;

export const DELETE_PLANO_MUTATION = gql`
  mutation deletePlano($id: Int!) {
    deletePlano(id: $id)
  }
`;
