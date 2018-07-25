export const planoTypes = `
  type Plano {
    _id: ID!

    descricao: String
    nome: String!
    valorMensal: Float!
    velocidadeDownload: Int!
    velocidadeUpload: Int!

    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input PlanoInput {
    descricao: String
    nome: String!
    valorMensal: Float!
    velocidadeDownload: Int!
    velocidadeUpload: Int!
  }
`;

export const planoQueries = `
  listarPlanos(first: Int, offset: Int, nopaginate: Boolean): [ Plano! ]!
  getPlanoByID(id: Int!): Plano
  totalPlanos: Int
`;

export const planoMutations = `
  createPlano(input: PlanoInput!): Plano
  updatePlano(id: Int!, input: PlanoInput!): Plano
`;
