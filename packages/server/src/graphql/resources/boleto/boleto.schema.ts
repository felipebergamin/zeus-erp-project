export const boletoTypes = `
  type Boleto {
    _id: ID!
    dataBaixa: String
    dataCredito: String
    dataPagamento: String
    dataVencimento: String!
    valorCobranca: Float!
    valorPago: Float
    digitoNossoNumero: String!
    nossoNumero: String!
    baixado: Boolean!
    pago: Boolean!
    registrado: Boolean!
    enviarAtualizacaoValor: Boolean!
    enviarAtualizacaoVencimento: Boolean!
    enviarPedidoBaixa: Boolean!
    lock: Boolean!

    carne: Carne
    cliente: Cliente!
    contaBancaria: ContaBancaria!
    ocorrencias: [ OcorrenciaBancaria! ]!

    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  input BoletoInput {
    dataVencimento: String!
    valorCobranca: Float!
    contaBancaria: Int!
    cliente: Int!
    carne: Int
  }

  input PesquisaBoletoInput {
    dataBaixa: String
    dataCredito: String
    dataPagamento: String
    dataVencimento: String
    valorCobranca: Float
    valorPago: Float
    digitoNossoNumero: String
    nossoNumero: String
    baixado: Boolean
    pago: Boolean
    registrado: Boolean
    enviarAtualizacaoValor: Boolean
    enviarAtualizacaoVencimento: Boolean
    enviarPedidoBaixa: Boolean

    carne: Int
    cliente: Int
    contaBancaria: Int

    createdAt: String
    updatedAt: String
    deletedAt: String
  }
`;

export const boletoQueries = `
  listarBoletos(first: Int, offset: Int): [ Boleto! ]!
  listarBoletosPorCliente(clienteID: Int!): [ Boleto! ]!
  getBoletoComID(id: Int!): Boleto
  pesquisarBoletos(searchVals: PesquisaBoletoInput!): [ Boleto! ]!
  totalBoletos: Int
`;

export const boletoMutations = `
  addBoleto(input: BoletoInput!): Boleto
  updateBoleto(id: Int!, input: BoletoInput!): Boleto
`;
