export const chamadoTypes = `
  type Chamado {
    _id: ID!

    cancelado: Boolean
    canceladoEm: String
    canceladoPor: Usuario
    motivoCancelamento: String

    finalizado: Boolean
    finalizadoEm: String
    imagemAssinatura: String
    observacoesTecnico: String
    problema: ProblemaChamado
    tecnico: Usuario!

    boletoCobranca: Boleto
    formaPagamento: String
    geraCobranca: Boolean
    isentarCobranca: Boolean
    valorACobrar: Float
    recebidoEm: String
    recebidoPor: Usuario

    abertoPor: Usuario!
    mensagem: String!
    motivoAbertura: String!
    sinalOnuAbertura: Float
    sinalOnuFechamento: Float

    pontoAcesso: PontoAcesso!

    prioridade: Int!
    protocolo: String!

    createdAt: String
    updatedAt: String
  }

  input AberturaChamadoInput {
    mensagem: String!
    motivoAbertura: String!
    pontoAcesso: Int!
    prioridade: Int!
    tecnico: Int!
  }

  input CancelarChamadoInput {
    motivoCancelamento: String!
  }

  input FinalizarChamadoInput {
    imagemAssinatura: String!
    observacoesTecnico: String!
    problema: Int!
  }

  input ReceberChamadoInput {
    formaPagamento: String!
    isentarCobranca: Boolean!
  }

  input BuscarChamadosInput {
    cancelado: Boolean
    canceladoEm: String
    canceladoPor: Int
    motivoCancelamento: String

    finalizado: Boolean
    finalizadoEm: String
    imagemAssinatura: String
    observacoesTecnico: String
    problema: Int
    tecnico: Int

    boletoCobranca: Int
    formaPagamento: String
    geraCobranca: Boolean
    isentarCobranca: Boolean
    valorACobrar: Float
    recebidoEm: String
    recebidoPor: Int

    abertoPor: Int
    mensagem: String
    motivoAbertura: String
    sinalOnuAbertura: Float
    sinalOnuFechamento: Float

    pontoAcesso: Int

    prioridade: Int
    protocolo: String

    createdAt: String
    updatedAt: String
  }
`;

export const chamadoQueries = `
  listarChamados(first: Int, offset: Int): [ Chamado! ]!
  buscarChamados(searchValues: BuscarChamadosInput!): [ Chamado! ]!
  chamadoByID(id: Int!): Chamado
`;

export const chamadoMutations = `
  abrirChamado(input: AberturaChamadoInput!): Chamado
  cancelarChamado(id: Int!, input: CancelarChamadoInput!): Chamado
  finalizarChamado(id: Int!, input: FinalizarChamadoInput!): Chamado
  receberChamado(id: Int!, input: ReceberChamadoInput!): Chamado
`;
