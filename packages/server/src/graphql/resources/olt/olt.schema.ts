export const oltTypes = `
  type OLT {
    _id: ID!
    ip: String!
    nome: String!
    obs: String

    createdAt: String
    updatedAt: String
  }

  input OLTInput {
    ip: String!
    nome: String!
    obs: String
  }
`;

export const oltQueries = `
  listarOLTs(first: Int, offset: Int, nopaginate: Boolean): [ OLT! ]!
  getOLTByID(id: Int!): OLT
  totalOlts: Int
`;

export const oltMutations = `
  createOLT(input: OLTInput!): OLT
  updateOLT(oltID: Int!, input: OLTInput!): OLT
`;
