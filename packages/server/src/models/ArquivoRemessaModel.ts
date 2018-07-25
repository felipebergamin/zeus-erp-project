import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface ArquivoRemessaAttributes {
  _id?: number;
  contaBancaria?: number;
  conteudoArquivo?: string;
  diaGeracao?: number;
  mesGeracao?: number;
  nomeArquivo?: string;
  quantidadeOperacoes?: number;
}

export interface ArquivoRemessaInstance extends Sequelize.Instance<ArquivoRemessaAttributes> {}

export interface ArquivoRemessaModel extends BaseModelInterface, Sequelize.Model<ArquivoRemessaInstance, ArquivoRemessaAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ArquivoRemessaModel => {
  const remessa: ArquivoRemessaModel = sequelize.define('ArquivoRemessa', {
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
    diaGeracao: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    mesGeracao: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    nomeArquivo: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    quantidadeOperacoes: {
      allowNull: false,
      type: dataTypes.INTEGER,
    }
  });

  return remessa;
};
