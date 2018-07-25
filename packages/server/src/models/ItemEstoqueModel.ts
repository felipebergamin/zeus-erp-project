import * as Sequelize from 'sequelize';

import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ItemEstoqueAttributes {
  _id?: number;
  nome?: string;
  observacao?: string;
  quantidade?: number;
  quantidadeInicial?: number;
  quantidadeMinima?: number;
  unidadeMedida?: string;
}

export interface ItemEstoqueInstance extends Sequelize.Instance<ItemEstoqueAttributes> {}

export interface ItemEstoqueModel extends BaseModelInterface, Sequelize.Model<ItemEstoqueInstance, ItemEstoqueAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ItemEstoqueModel => {
  const itemEstoque: ItemEstoqueModel = sequelize.define('ItemEstoque', {
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
    observacao: {
      type: dataTypes.STRING,
    },
    quantidadeInicial: {
      defaultValue: 0,
      type: dataTypes.INTEGER,
    },
    quantidadeMinima: {
      defaultValue: 0,
      type: dataTypes.INTEGER,
    },
    unidadeMedida: {
      defaultValue: 'unidades',
      type: dataTypes.STRING,
    },
  }, {
    tableName: 'itensestoque'
  });

  itemEstoque.associate = (models: ModelsInterface) => {
    itemEstoque.hasMany(models.BaixaEstoque, {
      foreignKey: {
        allowNull: false,
        field: 'item',
        name: 'item',
      }
    });

    itemEstoque.hasMany(models.LancamentoEstoque, {
      foreignKey: {
        allowNull: false,
        field: 'item',
        name: 'item',
      }
    });
  };

  return itemEstoque;
};
