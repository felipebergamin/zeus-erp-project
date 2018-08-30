import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface BaixaEstoqueAttributes {
  _id?: number;
  criadoPor: number;

  descricao?: string;
  item?: number;
  quantidade?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaixaEstoqueInstance extends Sequelize.Instance<BaixaEstoqueAttributes> {}

export interface BaixaEstoqueModel extends BaseModelInterface, Sequelize.Model<BaixaEstoqueInstance, BaixaEstoqueAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): BaixaEstoqueModel => {
  const baixaEstoque: BaixaEstoqueModel = sequelize.define('BaixaEstoque', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    descricao: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    quantidade: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
  }, {
    tableName: 'baixasestoque',
  });

  baixaEstoque.associate = (models: ModelsInterface) => {
    baixaEstoque.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: false,
        field: 'criadoPor',
        name: 'criadoPor',
      }
    });
  };

  return baixaEstoque;
};
