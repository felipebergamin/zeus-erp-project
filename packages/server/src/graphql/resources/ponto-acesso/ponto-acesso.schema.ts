export const pontoAcessoTypes = `
  type PontoAcesso {
    _id: ID!

    autoAtrelarMac: Boolean!
    ipAddress: String
    login: String!
    macAddress: String
    macOnu: String
    passwd: String!
    ponNo: String
    slotNo: String
    incluirNaCobranca: Boolean!

    bairro: String
    cep: String
    cidade: String
    complemento: String
    estado: String
    latitude: Float
    logradouro: String
    longitude: Float
    numero: String

    olt: OLT
    plano: Plano!
    pool: IPPool
    cliente: Cliente!

    createdAt: String
    updatedAt: String
  }

  input CreatePontoAcessoInput {
    autoAtrelarMac: Boolean
    ipAddress: String
    login: String!
    macAddress: String
    macOnu: String
    passwd: String!
    ponNo: String
    slotNo: String
    incluirNaCobranca: Boolean

    bairro: String!
    cep: String!
    cidade: String!
    complemento: String
    estado: String!
    latitude: Float
    logradouro: String!
    longitude: Float
    numero: String!

    olt: Int
    plano: Int!
    pool: Int
    cliente: Int!
  }

  input UpdatePontoAcessoInput {
    autoAtrelarMac: Boolean
    ipAddress: String
    login: String
    macAddress: String
    macOnu: String
    passwd: String
    ponNo: String
    slotNo: String
    incluirNaCobranca: Boolean

    bairro: String
    cep: String
    cidade: String
    complemento: String
    estado: String
    latitude: Float
    logradouro: String
    longitude: Float
    numero: String

    olt: Int
    plano: Int
    pool: Int
  }

  input BuscarPontosAcesso {
    autoAtrelarMac: Boolean
    ipAddress: String
    login: String
    macAddress: String
    macOnu: String
    passwd: String
    ponNo: String
    slotNo: String
    incluirNaCobranca: Boolean

    bairro: String
    cep: String
    cidade: String
    complemento: String
    estado: String
    latitude: Float
    logradouro: String
    longitude: Float
    numero: String

    olt: Int
    plano: Int
    pool: Int
    cliente: Int

    createdAt: String
    updatedAt: String
  }
`;

export const pontoAcessoQueries = `
  listarPontosDeAcesso(first: Int, offset: Int, nopaginate: Boolean): [ PontoAcesso! ]!
  totalPontosDeAcesso: Int
  pontoDeAcessoPorCliente(idCliente: Int!): [ PontoAcesso! ]!
  pontoDeAcessoPorID(id: Int!): PontoAcesso
  loginAlreadyExists(login: String!): Boolean
  buscarPontosAcesso(searchVals: BuscarPontosAcesso!): [ PontoAcesso! ]!
`;

export const pontoAcessoMutations = `
  addPontoDeAcesso(input: CreatePontoAcessoInput!): PontoAcesso
  updatePontoDeAcesso(id: Int!, input: UpdatePontoAcessoInput!): PontoAcesso
  removerPontoAcesso(id: Int!): Boolean
`;
