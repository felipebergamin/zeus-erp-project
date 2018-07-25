export const baixaEstoqueTypes = `
  type BaixaEstoque {
    _id: ID!
    criadoPor: Usuario!

    descricao: String!
    item: ItemEstoque!
    quantidade: Int!

    createdAt: String
    updatedAt: String
  }

  input BaixaEstoqueInput {
    descricao: String!
    item: Int!
    quantidade: Int!
  }
`;

export const baixaEstoqueQueries = `
  listarBaixasEstoque(first: Int, offset: Int): [ BaixaEstoque! ]!
  listarBaixasEstoquePorItem(idItem: Int!, first: Int, offset: Int): [ BaixaEstoque! ]!
`;

export const baixaEstoqueMutations = `
  addBaixaEstoque(input: BaixaEstoqueInput!): BaixaEstoque
  updateBaixaEstoque(id: Int!, input: BaixaEstoqueInput!): BaixaEstoque
  deleteBaixaEstoque(id: Int!): Boolean
`;
