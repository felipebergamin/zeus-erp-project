import gql from 'graphql-tag';
import { ProblemaChamado } from '../../models/ProblemaChamado';

export interface ProblemaChamadoInput {
  descricao: string;
  geraCobranca: boolean;
  valorCobrado?: number;
}

export interface ListarProblemasChamadoQuery {
  listarProblemasChamado: ProblemaChamado[];
  totalProblemasChamado: number;
}

export const ADD_PROBLEMA_CHAMADO_MUTATION = gql`
  mutation addProblema($input: ProblemaChamadoInput!) {
    addProblemaChamado(input: $input) {
      _id
      createdAt
    }
  }
`;

export const LISTAR_PROBLEMAS_CHAMADO_QUERY = gql`
  query listarProblemasChamado($first: Int, $offset: Int) {
    listarProblemasChamado(first: $first, offset: $offset) {
      _id
      descricao
      geraCobranca
      valorCobrado
      createdAt
    }
  }
`;

export const GET_PROBLEMA_BY_ID = gql`
  query problemaChamadoByID($id: Int!) {
    problemaChamadoByID(id: $id) {
      _id
      descricao
      geraCobranca
      valorCobrado
      createdAt
      updatedAt
    }
  }
`;
