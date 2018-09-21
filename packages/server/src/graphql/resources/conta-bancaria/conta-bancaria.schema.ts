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
    version: Int!

    createdAt: String
    updatedAt: String
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

  input ContaBancariaUpdateInput {
    digitoAgencia: String
    numeroAgencia: String
    carteira: String
    cedente: String
    codigoCedente: String
    digitoConta: String
    numeroConta: String
    multaDia: Float
    multaVencimento: Float
    nome: String
    nossoNumero: LongInt
    proximaRemessa: Int

    version: Int!
  }
`;

export const contaBancariaQueries = `
  listBankAccounts(first: Int, offset: Int, nopaginate: Boolean): [ ContaBancaria! ]!
  getBankAccountByID(id: Int!): ContaBancaria
  totalBankAccounts: Int
`;

export const contaBancariaMutations = `
  createBankAccount(input: ContaBancariaInput!): ContaBancaria
  updateBankAccount(id: Int!, input: ContaBancariaUpdateInput!): ContaBancaria
  deleteBankAccount(id: Int!): Boolean
`;
