
export const perfilTypes = `
  type PerfilUsuario {
    _id: ID!
    nome: String!

    alterarClientes: Boolean!
    bloquearClientes: Boolean!
    criarClientes: Boolean!
    desativarClientes: Boolean!
    desbloquearClientes: Boolean!
    visualizarClientes: Boolean!

    alterarBoletos: Boolean!
    criarBoletos: Boolean!
    gerarRemessa: Boolean!
    importarRetorno: Boolean!
    receberBoletos: Boolean!
    removerBoletos: Boolean!
    visualizarBoletos: Boolean!

    alterarUsuarios: Boolean!
    criarUsuarios: Boolean!
    removerUsuarios: Boolean!
    visualizarUsuarios: Boolean!

    abrirChamadoTecnico: Boolean!
    alterarChamadoTecnico: Boolean!
    cancelarChamadoTecnico: Boolean!
    fecharChamadoTecnico: Boolean!
    visualizarChamados: Boolean!

    abrirInstalacao: Boolean!
    alterarInstalacao: Boolean!
    cancelarInstalacao: Boolean!
    visualizarInstalacao: Boolean!

    acessaAppTecnico: Boolean!
    acessoTelegram: Boolean!
    acessoWeb: Boolean!
    visualizarLogs: Boolean!

    createdAt: String
    updatedAt: String
  }

  input PerfilUsuarioInput {
    nome: String!

    alterarClientes: Boolean!
    bloquearClientes: Boolean!
    criarClientes: Boolean!
    desativarClientes: Boolean!
    desbloquearClientes: Boolean!
    visualizarClientes: Boolean!

    alterarBoletos: Boolean!
    criarBoletos: Boolean!
    gerarRemessa: Boolean!
    importarRetorno: Boolean!
    receberBoletos: Boolean!
    removerBoletos: Boolean!
    visualizarBoletos: Boolean!

    alterarUsuarios: Boolean!
    criarUsuarios: Boolean!
    removerUsuarios: Boolean!
    visualizarUsuarios: Boolean!

    abrirChamadoTecnico: Boolean!
    alterarChamadoTecnico: Boolean!
    cancelarChamadoTecnico: Boolean!
    fecharChamadoTecnico: Boolean!
    visualizarChamados: Boolean!

    abrirInstalacao: Boolean!
    alterarInstalacao: Boolean!
    cancelarInstalacao: Boolean!
    visualizarInstalacao: Boolean!

    acessaAppTecnico: Boolean!
    acessoTelegram: Boolean!
    acessoWeb: Boolean!
    visualizarLogs: Boolean!
  }
`;

export const perfilQueries = `
  listarPerfisUsuario(first: Int, offset: Int, nopaginate: Boolean): [ PerfilUsuario! ]!
  totalPerfisUsuario: Int
`;

export const perfilMutations = `
  createUserProfile(input: PerfilUsuarioInput!): PerfilUsuario!
  updateUserProfile(id: Int!, input: PerfilUsuarioInput!): PerfilUsuario
  deleteUserProfile(id: Int!): Boolean
`;
