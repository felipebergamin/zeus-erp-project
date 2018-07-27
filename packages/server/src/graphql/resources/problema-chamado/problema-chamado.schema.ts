export const problemaChamadoTypes = `
  type ProblemaChamado {
    _id: ID!
    descricao: String!
    geraCobranca: Boolean!
    valorCobrado: Float
  }

  input ProblemaChamadoInput {
    descricao: String!
    geraCobranca: Boolean!
    valorCobrado: Float
  }
`;

export const problemaChamadoQueries = `
  listarProblemasChamado(first: Int, offset: Int): [ ProblemaChamado! ]!
`;

export const problemaChamadoMutations = `
  addProblemaChamado(input: ProblemaChamadoInput!): ProblemaChamado
  updateProblemaChamado(id: Int!, input: ProblemaChamadoInput!): ProblemaChamado
`;