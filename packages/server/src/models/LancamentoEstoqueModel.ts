import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface LancamentoEstoqueAttributes {
  _id?: number;
  criadoPor?: number;
  descricao?: string;
  item?: number;
  quantidade?: number;
}

export interface LancamentoEstoqueInstance extends Sequelize.Instance<LancamentoEstoqueAttributes> {}

export interface LancamentoEstoqueModel extends BaseModelInterface, Sequelize.Model<LancamentoEstoqueInstance, LancamentoEstoqueAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): LancamentoEstoqueModel => {
  const lancamentoEstoque: LancamentoEstoqueModel = sequelize.define('LancamentoEstoque', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    descricao: {
      type: dataTypes.STRING,
    },
    quantidade: {
      type: dataTypes.INTEGER,
    }
  });

  lancamentoEstoque.associate = (models: ModelsInterface) => {
    lancamentoEstoque.belongsTo(models.Usuario, {
      foreignKey: {
        allowNull: false,
        field: 'criadoPor',
        name: 'criadoPor'
      }
    });
  };

  return lancamentoEstoque;
};
