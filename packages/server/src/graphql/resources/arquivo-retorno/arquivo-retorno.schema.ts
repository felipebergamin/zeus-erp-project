export const arquivoRetornoTypes = `
  type ArquivoRetorno {
    _id: ID!

    contaBancaria: ContaBancaria!
    dataGravacao: String
    nomeArquivo: String!
    processado: Boolean!
    quantidadeOperacoes: Int!

    qtdeRegistrosConfirmados: Int!
    valorRegistrosConfirmados: Float!
    valorRegistrosLiquidados: Float!
    qtdeRegistrosLiquidados: Int!
    valorRegistros06: Float!
    qtdeRegistrosBaixados: Int!
    valorRegistrosBaixados: Float!
    qtdeRegistrosVencimentoAlterado: Int!
    valorRegistrosVencimentoAlterado: Float!

    ocorrencias: [ OcorrenciaBancaria ]!

    createdAt: String!
    updatedAt: String
  }

  input UploadRetornoInput {
    contaBancaria: Int!
    file: Upload!
  }
`;

export const arquivoRetornoQueries = `
  listarArquivosRetorno(first: Int, offset: Int): [ ArquivoRetorno! ]!
  totalArquivosRetorno: Int
`;

export const arquivoRetornoMutations = `
  uploadRetorno(input: UploadRetornoInput!): ArquivoRetorno
`;
