
export const mikrotikRouterTypes = `
  type MikrotikRouter {
    id: ID!

    ipAddress: String!
    username: String!
    apiPort: Int!
    systemName: String!
    radiusSecret: String!

    createdAt: String!
    updatedAt: String!
  }

  input MikrotikRouterInput {
    ipAddress: String!
    username: String!
    password: String!
    apiPort: Int
    systemName: String!
    radiusSecret: String!
  }
`;

export const mikrotikRouterQueries = `
  mikrotikRouterById(id: Int!): MikrotikRouter
  mikrotikRoutersList(first: Int, offset: Int, nopaginate: Boolean): [ MikrotikRouter! ]!
  mikrotikRoutersCount: Int!
`;

export const mikrotikRouterMutations = `
  createMikrotikRouter(input: MikrotikRouterInput!): MikrotikRouter
  updateMikrotikRouter(id: Int!, input: MikrotikRouterInput!): MikrotikRouter
  deleteMikrotikRouter(id: Int!): Boolean
`;
