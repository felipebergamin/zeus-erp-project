export const ipPoolTypes = `
  type IPPool {
    _id: ID!
    cidr: String!
    nome: String!

    createdAt: String
    updatedAt: String
  }

  input IPPoolInput {
    cidr: String!
    nome: String!
  }
`;

export const ipPoolQueries = `
  listarIPPools(first: Int, offset: Int, nopaginate: Boolean): [ IPPool! ]!
  getPoolByID(id: Int!): IPPool
`;

export const ipPoolMutations = `
  createIPPool(input: IPPoolInput!): IPPool
  updateIPPool(id: Int!, input: IPPoolInput!): IPPool
`;
