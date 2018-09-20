import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface OLTAttributes {
  _id?: number;
  ip?: string;
  nome?: string;
  obs?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface OLTInstance extends Sequelize.Instance<OLTAttributes> {}

export interface OLTModel extends BaseModelInterface, Sequelize.Model<OLTInstance, OLTAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): OLTModel => {
  const olt: OLTModel = sequelize.define('OLT', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    ip: {
      allowNull: false,
      type: dataTypes.STRING,
      validate: {
        isIPv4: {
          msg: 'O endereço IP é inválido',
        },
      },
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    obs: {
      allowNull: true,
      type: dataTypes.STRING,
    },
  }, {
    tableName: 'olts',
  });

  olt.associate = (models: ModelsInterface) => {
    olt.hasMany(models.PontoAcesso, {
      foreignKey: {
        allowNull: true,
        field: 'olt',
        name: 'olt',
      },
      onDelete: 'RESTRICT',
    });
  };

  return olt;
};
