import * as moment from 'moment';
import * as Sequelize from 'sequelize';

import { ModelsInterface } from '../interfaces/ModelsInterface';

export type FormaPagamento = 'cheque' | 'dinheiro' | 'cartao' | 'boleto';
export type Prioridade = 'baixa' | 'normal' | 'alta' | 'critica';

export interface ChamadoAttributes {
  _id?: number;
  cancelado?: boolean;
  canceladoEm?: Date;
  canceladoPor?: number;
  motivoCancelamento?: string;

  finalizado?: boolean;
  finalizadoEm?: Date;
  imagemAssinatura?: string;
  observacoesTecnico?: string;
  problema?: number;

  boletoCobranca?: number;
  formaPagamento?: FormaPagamento;
  /* se o chamado deveria ser cobrado de acordo com as regras da empresa */
  geraCobranca?: boolean;
  /* isentar a cobrança mesmo se o chamado deveria ter sido cobrado */
  isentarCobranca?: boolean;
  valorACobrar?: number;
  recebidoEm?: Date;
  recebidoPor?: number;

  abertoPor?: number;
  mensagem?: string;
  motivoAbertura?: string;

  cliente?: number;
  pontoAcesso?: number;

  prioridade?: Prioridade;
  protocolo?: string;
  tecnico?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChamadoInstance extends Sequelize.Instance<ChamadoAttributes> {}

export interface ChamadoModel extends Sequelize.Model<ChamadoInstance, ChamadoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ChamadoModel => {
  const chamado: ChamadoModel = sequelize.define('Chamado', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    cancelado: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    canceladoEm: {
      allowNull: true,
      type: dataTypes.DATE,
    },
    motivoCancelamento: {
      allowNull: true,
      type: dataTypes.STRING,
    },

    finalizado: {
      type: dataTypes.BOOLEAN
    },
    finalizadoEm: {
      allowNull: true,
      type: dataTypes.DATE,
    },
    imagemAssinatura: {
      allowNull: true,
      type: dataTypes.TEXT,
    },
    observacoesTecnico: {
      allowNull: true,
      type: dataTypes.STRING,
    },

    formaPagamento: {
      type: dataTypes.ENUM([ 'cheque', 'dinheiro', 'cartao', 'boleto' ]),
    },
    /* se o chamado deveria ser cobrado de acordo com as regras da empresa */
    geraCobranca: {
      type: dataTypes.BOOLEAN,
    },
    /* isentar a cobrança mesmo se o chamado deveria ter sido cobrado */
    isentarCobranca: {
      type: dataTypes.BOOLEAN,
    },
    recebidoEm: {
      type: dataTypes.DATE,
    },
    valorACobrar: {
      type: dataTypes.FLOAT
    },

    mensagem: {
      allowNull: true,
      type: dataTypes.STRING,
    },
    motivoAbertura: {
      allowNull: true,
      type: dataTypes.STRING,
    },

    prioridade: {
      allowNull: false,
      type: dataTypes.ENUM([ 'baixa', 'normal', 'alta', 'critica' ]),
    },
    protocolo: {
      allowNull: false,
      type: dataTypes.STRING,
      unique: true
    }
  });

  chamado.associate = (models: ModelsInterface) => {
    chamado.belongsTo(models.PontoAcesso, {
      foreignKey: {
        allowNull: false,
        field: 'pontoAcesso',
        name: 'pontoAcesso',
      }
    });

    chamado.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: true,
        field: 'recebidoPor',
        name: 'recebidoPor',
      }
    });

    chamado.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: true,
        field: 'canceladoPor',
        name: 'canceladoPor',
      }
    });
  };

  return chamado;
};
