import * as Sequelize from 'sequelize';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PlanoAttributes {
  _id?: number;

  descricao?: string;
  nome?: string;
  valorMensal?: number;
  velocidadeDownload?: number;
  velocidadeUpload?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PlanoInstance extends Sequelize.Instance<PlanoAttributes> {}

export interface PlanoModel extends Sequelize.Model<PlanoInstance, PlanoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PlanoModel => {
  const plano: PlanoModel = sequelize.define('Plano', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    descricao: {
      allowNull: true,
      type: dataTypes.TEXT,
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    valorMensal: {
      allowNull: false,
      type: dataTypes.FLOAT(10, 2),
    },
    velocidadeDownload: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    velocidadeUpload: {
      allowNull: false,
      type: dataTypes.INTEGER,
    }

  }, {
    paranoid: true,
    tableName: 'planos',
  });

  plano.associate = (models: ModelsInterface) => {
    plano.hasMany(models.PontoAcesso, {
      foreignKey: {
        allowNull: false,
        field: 'plano',
        name: 'plano',
      }
    });
  };

  return plano;
};
