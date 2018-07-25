import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface ArquivoRetornoAttributes {
  _id?: number;
  contaBancaria?: number;
  conteudoArquivo?: string;
  dataGravacao?: Date;
  nomeArquivo?: string;
  processado?: boolean;
  quantidadeOperacoes?: number;

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
    conteudoArquivo: {
      allowNull: false,
      type: dataTypes.TEXT,
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
    }
  });

  return retorno;
};
