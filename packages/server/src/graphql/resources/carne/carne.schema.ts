export const carneTypes = `
  type Carne {
    _id: ID!
    cliente: Cliente!
    descricao: String!
    boletos: [ Boleto! ]!
  }

  input CreateCarneInput {
    cliente: Int!
    descricao: String!

    parcelas: Int
    valorParcelas: Int
    primeiroVencimento: String
  }
`;

export const carneQueries = `
  carnesPorCliente(cliente: Int!): [ Carne! ]!
  listarCarnes: [ Carne! ]!
`;

export const carneMutations = `
  addCarne(input: CreateCarneInput!): Carne
  addBoletoAoCarne(boleto: Int!, carne: Int!): Boolean
  removeBoletoDoCarne(boleto: Int!, carne: Int!): Boolean
`;
