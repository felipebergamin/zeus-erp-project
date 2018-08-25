export const arquivoRetornoTypes = `
  type ArquivoRetorno {
    _id: ID!
    contaBancaria: ContaBancaria
    conteudoArquivo: String
    dataGravacao: String
    nomeArquivo: String
    processado: Boolean
    quantidadeOperacoes: Int

    createdAt: String
    updatedAt: String
  }
`;

export const arquivoRetornoQueries = `
  listarArquivosRetorno(first: Int, offset: Int): [ ArquivoRetorno! ]!
  totalArquivosRetorno: Int
`;

export const arquivoRetornoMutations = `
  uploadRetorno(file: Upload!): Boolean
`;
