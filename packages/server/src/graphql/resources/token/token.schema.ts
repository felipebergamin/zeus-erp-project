export const tokenTypes = `
  type Token {
    token: String!
    _id: Int!
  }
`;

export const tokenQueries = `
  currentUser: Usuario
  isAuth: Boolean
`;

export const tokenMutations = `
  createToken(login: String!, passwd: String!): Token
  createQuickToken: Token
`;
