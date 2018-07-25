import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CarneAttributes {
  cliente: number;
  descricao: string;
  _id: number;
}

export interface CarneInstance extends Sequelize.Instance<CarneAttributes> {
}

export interface CarneModel extends BaseModelInterface, Sequelize.Model<CarneInstance, CarneAttributes> {
}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): CarneModel => {
  const carne: CarneModel = sequelize.define('Carne', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    descricao: {
      allowNull: false,
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'carnes'
  });

  carne.associate = (models: ModelsInterface): void => {
    carne.hasMany(models.Boleto, {
      foreignKey: {
        allowNull: true,
        field: 'carne',
        name: 'carne'
      }
    });

    carne.belongsTo(models.Cliente, {
      foreignKey: {
        allowNull: false,
        field: 'cliente',
        name: 'cliente',
      }
    });
  };

  return carne;
};
