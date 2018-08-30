export const arquivoRemessaTypes = `
  type ArquivoRemessa {
    _id: ID!
    contaBancaria: ContaBancaria!
    conteudoArquivo: String!
    diaGeracao: Int!
    mesGeracao: Int!
    nomeArquivo: String!
    quantidadeOperacoes: Int!

    createdAt: String
    updatedAt: String
  }

  input GerarArquivoRemessaInput {
    contaBancaria: Int!

    dataInicio: String
    dataFim: String
    cliente: Int
    enviarPedidoBaixa: Boolean
    enviarAtualizacaoValor: Boolean
    enviarAtualizacaoVencimento: Boolean
    reenviarRemetidos: Boolean
  }
`;

export const arquivoRemessaQueries = `
  listarArquivosRemessa(first: Int, offset: Int): [ ArquivoRemessa! ]!
  totalArquivosRemessa: Int!
`;

export const arquivoRemessaMutations = `
  gerarArquivoRemessa(input: GerarArquivoRemessaInput!): ArquivoRemessa
  deleteArquivoRemessa(id: Int!): Boolean
`;
