export interface PerfilUsuario {
  _id?: number;
  nome?: string;

  alterarClientes?: boolean;
  bloquearClientes?: boolean;
  criarClientes?: boolean;
  desativarClientes?: boolean;
  desbloquearClientes?: boolean;
  visualizarClientes?: boolean;

  alterarBoletos?: boolean;
  criarBoletos?: boolean;
  gerarRemessa?: boolean;
  importarRetorno?: boolean;
  receberBoletos?: boolean;
  removerBoletos?: boolean;
  visualizarBoletos?: boolean;

  alterarUsuarios?: boolean;
  criarUsuarios?: boolean;
  removerUsuarios?: boolean;
  visualizarUsuarios?: boolean;

  abrirChamadoTecnico?: boolean;
  alterarChamadoTecnico?: boolean;
  cancelarChamadoTecnico?: boolean;
  fecharChamadoTecnico?: boolean;
  visualizarChamados?: boolean;

  abrirInstalacao?: boolean;
  alterarInstalacao?: boolean;
  cancelarInstalacao?: boolean;
  visualizarInstalacao?: boolean;

  acessaAppTecnico?: boolean;
  acessoTelegram?: boolean;
  acessoWeb?: boolean;
  visualizarLogs?: boolean;
}
