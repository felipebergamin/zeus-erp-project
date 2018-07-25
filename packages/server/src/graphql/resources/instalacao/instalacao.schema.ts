export const instalacaoTypes = `
  type Instalacao {
    _id: ID!

    cancelada: Boolean!
    dataHoraCancelada: String
    motivoCancelamento: String

    atendente: Usuario!
    observacoesAtendente: String

    concluida: Boolean!
    dataAgenda: String!
    dataHoraConclusao: String

    pontoAcesso: PontoAcesso!
    protocolo: String!
    tecnicoResponsavel: Usuario

    pago: Boolean!
    recebidoPor: Usuario
    cobrado: Boolean!
    dataPagamento: String
    modoPagamento: String
    observacoesPagamento: String
    valor: Float
  }

  input AbrirInstalacaoInput {
    observacoesAtendente: String
    dataAgenda: String!
    pontoAcesso: Int!
    cobrado: Boolean!
    valor: Float
    modoPagamento: String
    observacoesPagamento: String
  }

  input UpdateInstalacaoInput {
    observacoesAtendente: String
    dataAgenda: String
    cobrado: Boolean
    valor: Float
    modoPagamento: String
    observacoesPagamento: String
  }

  input ReceberInstalacaoInput {
    valor: Float
    modoPagamento: String
    observacoesPagamento: String
  }

  input CancelarInstalacaoInput {
    motivoCancelamento: String
  }
`;

export const instalacaoQueries = `
  listarInstalacoes(first: Int, offset: Int): [ Instalacao! ]!
  instalacoesDoDia(day: String): [ Instalacao! ]!
`;

export const instalacaoMutations = `
  abrirInstalacao(input: AbrirInstalacaoInput!): Instalacao
  atualizarInstalacao(id: Int!, input: UpdateInstalacaoInput!): Instalacao
  cancelarInstalacao(id: Int!, input: CancelarInstalacaoInput!): Instalacao
  receberInstalacao(id: Int!, input: ReceberInstalacaoInput!): Instalacao
  finalizarInstalacao(id: Int!): Instalacao
`;
