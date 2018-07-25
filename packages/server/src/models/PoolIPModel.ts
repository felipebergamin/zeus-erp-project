import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PoolIPAttributes {
  _id?: number;
  cidr?: string;
  nome?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PoolIPInstance extends Sequelize.Instance<PoolIPAttributes> {}

export interface PoolIPModel extends BaseModelInterface, Sequelize.Model<PoolIPInstance, PoolIPAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PoolIPModel => {
  const pool: PoolIPModel = sequelize.define('PoolIP', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    cidr: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },
  });

  pool.associate = (models: ModelsInterface): void => {
    pool.hasMany(models.PontoAcesso, {
      foreignKey: {
        allowNull: true,
        field: 'pool',
        name: 'pool',
      }
    });
  };

  return pool;
};
