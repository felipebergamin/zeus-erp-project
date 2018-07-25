export const contaBancariaTypes = `
  type ContaBancaria {
    _id: ID!
    digitoAgencia: String!
    numeroAgencia: String!
    carteira: String!
    cedente: String!
    codigoCedente: String!
    digitoConta: String!
    numeroConta: String!
    multaDia: Float!
    multaVencimento: Float!
    nome: String!
    nossoNumero: LongInt!
    proximaRemessa: Int!

    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input ContaBancariaInput {
    digitoAgencia: String!
    numeroAgencia: String!
    carteira: String!
    cedente: String!
    codigoCedente: String!
    digitoConta: String!
    numeroConta: String!
    multaDia: Float!
    multaVencimento: Float!
    nome: String!
    nossoNumero: LongInt!
    proximaRemessa: Int!
  }
`;

export const contaBancariaQueries = `
  listBankAccounts(first: Int, offset: Int, excluded: Boolean, nopaginate: Boolean): [ ContaBancaria! ]!
  totalBankAccounts: Int
`;

export const contaBancariaMutations = `
  createBankAccount(input: ContaBancariaInput!): ContaBancaria
  updateBankAccount(id: Int!, input: ContaBancariaInput!): ContaBancaria
  deleteBankAccount(id: Int!): Boolean
  restoreBankAccount(id: Int!): Boolean
`;
