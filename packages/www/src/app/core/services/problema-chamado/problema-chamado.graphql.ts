import gql from 'graphql-tag';

export interface ProblemaChamadoInput {
  descricao: string;
  geraCobranca: boolean;
  valorCobrado?: number;
}

export const ADD_PROBLEMA_CHAMADO_MUTATION = gql`
  mutation addProblema($input: ProblemaChamadoInput!) {
    addProblemaChamado(input: $input) {
      _id
      createdAt
    }
  }
`;
