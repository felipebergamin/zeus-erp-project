export const ocorrenciaBancariaTypes = `
  type OcorrenciaBancaria {
    _id: ID!
    dataHora: String!
    ocorrencia: String!
    descricaoOcorrencia: String
    motivoOcorrencia: String
    boleto: Boleto!
  }
`;

export const ocorrenciaBancariaQueries = `
  ocorrenciasDoBoleto(boleto: Int!): [ OcorrenciaBancaria! ]!
`;

export const ocorrenciaBancariaMutations = `
`;
