export const itemEstoqueTypes = `
  type ItemEstoque {
    _id: ID!

    nome: String!
    observacao: String
    quantidade: Int
    quantidadeInicial: Int!
    quantidadeMinima: Int!
    unidadeMedida: String!
  }

  input CreateItemEstoqueInput {
    nome: String!
    observacao: String
    quantidadeInicial: Int!
    quantidadeMinima: Int!
    unidadeMedida: String!
  }

  input UpdateItemEstoqueInput {
    nome: String
    observacao: String
    quantidadeMinima: Int
    unidadeMedida: String
  }
`;

export const itemEstoqueQueries = `
  listarItensEstoque(first: Int, offset: Int): [ ItemEstoque! ]!
`;

export const itemEstoqueMutations = `
  addItemEstoque(input: CreateItemEstoqueInput!): ItemEstoque
  updateItemEstoque(id: Int!, input: UpdateItemEstoqueInput!): ItemEstoque
`;
