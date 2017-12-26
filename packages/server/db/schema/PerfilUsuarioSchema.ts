import { Schema } from '../connection';

const schema = new Schema({
  nome: {
    required: [true, 'O perfil precisa de um nome'],
    type: String,
  },

  alterarClientes: {
    default: false,
    type: Boolean,
  },
  bloquearClientes: {
    default: false,
    type: Boolean,
  },
  criarClientes: {
    default: false,
    type: Boolean,
  },
  desativarClientes: {
    default: false,
    type: Boolean,
  },
  desbloquearClientes: {
    default: false,
    type: Boolean,
  },
  visualizarClientes: {
    default: false,
    type: Boolean,
  },

  alterarBoletos: {
    default: false,
    type: Boolean,
  },
  criarBoletos: {
    default: false,
    type: Boolean,
  },
  gerarRemessa: {
    default: false,
    type: Boolean,
  },
  importarRetorno: {
    default: false,
    type: Boolean,
  },
  receberBoletos: {
    default: false,
    type: Boolean,
  },
  removerBoletos: {
    default: false,
    type: Boolean,
  },
  visualizarBoletos: {
    default: false,
    type: Boolean,
  },

  alterarUsuarios: {
    default: false,
    type: Boolean,
  },
  criarUsuarios: {
    default: false,
    type: Boolean,
  },
  removerUsuarios: {
    default: false,
    type: Boolean,
  },
  visualizarUsuarios: {
    default: false,
    type: Boolean,
  },

  abrirChamadoTecnico: {
    default: false,
    type: Boolean,
  },
  alterarChamadoTecnico: {
    default: false,
    type: Boolean,
  },
  cancelarChamadoTecnico: {
    default: false,
    type: Boolean,
  },
  fecharChamadoTecnico: {
    default: false,
    type: Boolean,
  },
  visualizarChamados: {
    default: false,
    type: Boolean,
  },

  abrirInstalacao: {
    default: false,
    type: Boolean,
  },
  alterarInstalacao: {
    default: false,
    type: Boolean,
  },
  cancelarInstalacao: {
    default: false,
    type: Boolean,
  },
  visualizarInstalacao: {
    default: false,
    type: Boolean,
  },

  acessaAppTecnico: {
    default: false,
    type: Boolean,
  },
  acessoTelegram: {
    default: false,
    type: Boolean,
  },
  acessoWeb: {
    default: false,
    type: Boolean,
  },
  visualizarLogs: {
    default: false,
    type: Boolean,
  },
});

export = schema;
