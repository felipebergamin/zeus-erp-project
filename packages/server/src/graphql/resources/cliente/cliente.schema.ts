
export const clienteTypes = `
  type Cliente {
    _id: ID!

    cpfCnpj: String!
    dataNascimento: String
    nome: String!
    rgIe: String!
    tags: String
    tipoPessoa: String!

    email: String!
    numeroCelular: String!
    telefoneFixo: String

    bairro: String!
    cep: String!
    cidade: String!
    complemento: String
    estado: String!
    latitude: Float
    logradouro: String!
    longitude: Float
    numero: String!

    autoBloquear: Boolean
    contaBancaria: ContaBancaria!
    diaVencimento: Int!
    observacoes: String

    pontosDeAcesso: [ PontoAcesso! ]!

    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input ClienteInput {
    cpfCnpj: String!
    dataNascimento: String
    nome: String!
    rgIe: String!
    tags: String
    tipoPessoa: String!

    email: String!
    numeroCelular: String!
    telefoneFixo: String

    bairro: String!
    cep: String!
    cidade: String!
    complemento: String
    estado: String!
    latitude: Float
    logradouro: String!
    longitude: Float
    numero: String!

    autoBloquear: Boolean
    contaBancaria: Int!
    diaVencimento: Int!
    observacoes: String
  }

  input BuscaClienteInput {
    cpfCnpj: String
    dataNascimento: String
    nome: String
    rgIe: String
    tags: String
    tipoPessoa: String

    email: String
    numeroCelular: String
    telefoneFixo: String

    bairro: String
    cep: String
    cidade: String
    complemento: String
    estado: String
    latitude: Float
    logradouro: String
    longitude: Float
    numero: String

    autoBloquear: Boolean
    contaBancaria: Int
    diaVencimento: Int
    observacoes: String

    createdAt: String
  }
`;

export const clienteQueries = `
  getCustomerByID(id: Int!): Cliente
  listCustomers(first: Int, offset: Int, excluded: Boolean): [ Cliente! ]!
  cpfCnpjAlreadyExists(cpfCnpj: String!): Boolean
  totalCustomers: Int
  searchCustomer(values: BuscaClienteInput!): [ Cliente! ]!
  valorTotalMensalidadeCliente(clienteID: Int!): Float
`;

export const clienteMutations = `
  createCustomer(input: ClienteInput!): Cliente
  updateCustomer(id: Int!, input: ClienteInput!): Cliente
  deleteCustomer(id: Int!): Boolean
`;
