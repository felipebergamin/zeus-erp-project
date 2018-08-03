export const usuarioTypes = `
  type Usuario {
    _id: ID!
    email: String!
    login: String!
    nome: String!
    perfil: PerfilUsuario!
    telegramID: String
    tipo: String!

    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input UsuarioInput {
    email: String!
    login: String!
    nome: String!
    passwd: String!
    perfil: Int!
    telegramID: String
    tipo: String!
  }
`;

export const usuarioQueries = `
  listUsers(first: Int, offset: Int): [ Usuario! ]!
  totalUsers: Int
`;

export const usuarioMutations = `
  createUser(input: UsuarioInput!): Usuario
  updateUser(id: Int!, input: UsuarioInput!): Usuario
  deleteUser(id: Int!): Boolean
  restoreUser(id: Int!): Boolean
`;
