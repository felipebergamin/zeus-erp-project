export const lancamentoEstoqueTypes = `
  type LancamentoEstoque {
    _id: ID!
    criadoPor: Usuario!
    descricao: String!
    item: ItemEstoque!
    quantidade: Int!
  }

  input LancamentoEstoqueInput {
    descricao: String!
    item: Int!
    quantidade: Int!
  }
`;

export const lancamentoEstoqueQueries = `
  listarLancamentosEstoque(first: Int, offset: Int): [ LancamentoEstoque! ]!
  listarLancamentosEstoquePorItem(idItem: Int!, first: Int, offset: Int): [ LancamentoEstoque! ]!
`;

export const lancamentoEstoqueMutations = `
  addLancamentoEstoque(input: LancamentoEstoqueInput!): LancamentoEstoque
  updateLancamentoEstoque(id: Int!, input: LancamentoEstoqueInput!): LancamentoEstoque
  deleteLancamentoEstoque(id: Int!): Boolean
`;
