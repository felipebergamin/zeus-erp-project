export const ocorrenciaBancariaTypes = `
  type OcorrenciaBancaria {
    _id: ID!
    agenciaCobradora: String
    bancoCobrador: String
    dataCredito: String
    dataHora: String!
    dataOcorrenciaNoBanco: String!
    idOcorrencia: String!
    jurosMora: Float
    motivosOcorrencia: String
    valorPago: Float

    boleto: Boleto
    arquivoRetorno: ArquivoRetorno!
  }
`;

export const ocorrenciaBancariaQueries = `
  ocorrenciasDoBoleto(boleto: Int!): [ OcorrenciaBancaria! ]!
  listarOcorrenciasBancarias: [ OcorrenciaBancaria! ]!
`;

export const ocorrenciaBancariaMutations = `
`;
