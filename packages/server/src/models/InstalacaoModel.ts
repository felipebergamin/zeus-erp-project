import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { generateProtocol } from '../util/generateProtocol';
import { FormaPagamento } from './ChamadoModel';

export interface InstalacaoAttributes {
  _id?: number;
  cancelada?: boolean;
  dataHoraCancelada?: Date;
  motivoCancelamento?: string;

  atendente?: number;
  observacoesAtendente?: string;

  concluida?: boolean;
  dataAgenda?: Date;
  dataHoraConclusao?: Date;

  pontoAcesso?: number;
  protocolo?: string;
  tecnicoResponsavel?: number;

  recebidoPor: number;
  cobrado?: boolean;
  dataPagamento?: Date;
  modoPagamento?: FormaPagamento;
  observacoesPagamento?: string;
  pago?: boolean;
  valor?: number;
}

export interface InstalacaoInstance extends Sequelize.Instance<InstalacaoAttributes> {}

export interface InstalacaoModel extends BaseModelInterface, Sequelize.Model<InstalacaoInstance, InstalacaoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): InstalacaoModel => {
  const instalacao: InstalacaoModel = sequelize.define('Instalacao', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    cancelada: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    dataHoraCancelada: {
      type: dataTypes.DATE,
    },
    motivoCancelamento: {
      type: dataTypes.STRING,
    },
    observacoesAtendente: {
      type: dataTypes.STRING,
    },

    concluida: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    dataAgenda: {
      type: dataTypes.DATE,
    },
    dataHoraConclusao: {
      type: dataTypes.DATE,
    },

    protocolo: {
      type: dataTypes.STRING,
      unique: true,
    },

    cobrado: {
      defaultValue: true,
      type: dataTypes.BOOLEAN,
    },
    dataPagamento: {
      type: dataTypes.DATE,
    },
    modoPagamento: {
      allowNull: true,
      type: dataTypes.ENUM([ 'cartao', 'dinheiro', 'cheque' ]),
    },
    observacoesPagamento: {
      type: dataTypes.TEXT,
    },
    pago: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    valorPago: {
      defaultValue: 0,
      type: dataTypes.NUMERIC( { precision: 2 } ),
    },
  }, {
    tableName: 'instalacoes',

    hooks: {
      beforeCreate: (instalacaoInstance) => {
        instalacaoInstance.set('protocolo', generateProtocol('D'));
      }
    }
  });

  instalacao.associate = (models: ModelsInterface): void => {
    instalacao.belongsTo(models.PontoAcesso, {
      foreignKey: {
        allowNull: false,
        field: 'pontoAcesso',
        name: 'pontoAcesso',
      }
    });

    instalacao.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: false,
        field: 'atendente',
        name: 'atendente',
      }
    });

    instalacao.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: true,
        field: 'tecnicoResponsavel',
        name: 'tecnicoResponsavel',
      }
    });

    instalacao.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: true,
        field: 'recebidoPor',
        name: 'recebidoPor',
      }
    });
  };

  return instalacao;
};
