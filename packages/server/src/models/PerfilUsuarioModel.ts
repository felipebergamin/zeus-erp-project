import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PerfilUsuarioAttributes {
  _id: number;
  nome: string;

  leitura: boolean;
  escrita: boolean;

  alterarClientes: boolean;
  bloquearClientes: boolean;
  criarClientes: boolean;
  desativarClientes: boolean;
  desbloquearClientes: boolean;
  visualizarClientes: boolean;

  alterarBoletos: boolean;
  criarBoletos: boolean;
  gerarRemessa: boolean;
  importarRetorno: boolean;
  pedirBaixaBoleto: boolean;
  visualizarBoletos: boolean;

  alterarUsuarios: boolean;
  criarUsuarios: boolean;
  removerUsuarios: boolean;
  visualizarUsuarios: boolean;

  abrirChamadoTecnico: boolean;
  alterarChamadoTecnico: boolean;
  cancelarChamadoTecnico: boolean;
  fecharChamadoTecnico: boolean;
  visualizarChamados: boolean;

  abrirInstalacao: boolean;
  alterarInstalacao: boolean;
  cancelarInstalacao: boolean;
  visualizarInstalacao: boolean;
  finalizarInstalacao: boolean;

  acessaAppTecnico: boolean;
  acessoTelegram: boolean;
  acessoWeb: boolean;
  visualizarLogs: boolean;
}

export interface PerfilUsuarioInstance extends Sequelize.Instance<PerfilUsuarioAttributes> {}

export interface PerfilUsuarioModel extends BaseModelInterface, Sequelize.Model<PerfilUsuarioInstance, PerfilUsuarioAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PerfilUsuarioModel => {
  const perfilUsuario: PerfilUsuarioModel = sequelize.define('PerfilUsuario', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },

    leitura: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    escrita: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    alterarClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    bloquearClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    criarClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    desativarClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    desbloquearClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarClientes: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    alterarBoletos: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    criarBoletos: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    gerarRemessa: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    importarRetorno: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    pedirBaixaBoleto: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarBoletos: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    alterarUsuarios: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    criarUsuarios: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    removerUsuarios: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarUsuarios: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    abrirChamadoTecnico: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    alterarChamadoTecnico: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    cancelarChamadoTecnico: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    fecharChamadoTecnico: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarChamados: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    abrirInstalacao: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    alterarInstalacao: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    cancelarInstalacao: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarInstalacao: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    finalizarInstalacao: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    acessaAppTecnico: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    acessoTelegram: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    acessoWeb: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    visualizarLogs: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
  }, {
    tableName: 'perfisusuarios'
  });

  perfilUsuario.associate = (models: ModelsInterface) => {
    perfilUsuario.hasMany(models.Usuario, {
      foreignKey: {
        allowNull: false,
        field: 'perfil',
        name: 'perfil',
      }
    });
  };

  return perfilUsuario;
};
