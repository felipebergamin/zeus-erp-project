import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface ArquivoRetornoAttributes {
  _id?: number;

  contaBancaria?: number;
  dataGravacao?: Date; // informação no header do arquivo
  nomeArquivo?: string;
  processado?: boolean;
  quantidadeOperacoes?: number;

  /* informações no registro trailler do arquivo */
  qtdeRegistrosConfirmados?: number;
  valorRegistrosConfirmados?: number;
  valorRegistrosLiquidados?: number;
  qtdeRegistrosLiquidados?: number;
  valorRegistros06?: number;
  qtdeRegistrosBaixados?: number;
  valorRegistrosBaixados?: number;
  qtdeRegistrosVencimentoAlterado?: number;
  valorRegistrosVencimentoAlterado?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArquivoRetornoInstance extends Sequelize.Instance<ArquivoRetornoAttributes> {}

export interface ArquivoRetornoModel extends BaseModelInterface, Sequelize.Model<ArquivoRetornoInstance, ArquivoRetornoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ArquivoRetornoModel => {
  const retorno: ArquivoRetornoModel = sequelize.define('ArquivoRetorno', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    dataGravacao: {
      type: dataTypes.DATEONLY,
    },
    nomeArquivo: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    processado: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
    quantidadeOperacoes: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },

    qtdeRegistrosBaixados: {
      allowNull: false,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    qtdeRegistrosConfirmados: {
      allowNull: false,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    qtdeRegistrosLiquidados: {
      allowNull: false,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    qtdeRegistrosVencimentoAlterado: {
      allowNull: false,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    valorRegistros06: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
    valorRegistrosBaixados: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
    valorRegistrosConfirmados: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
    valorRegistrosLiquidados: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
    valorRegistrosVencimentoAlterado: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
  }, {
    paranoid: true,
    tableName: 'arquivosretorno',
  });

  return retorno;
};
