import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ProblemaChamadoAttributes {
  _id?: number;
  descricao?: string;
  geraCobranca?: boolean;
  valorCobrado?: number;
}

export interface ProblemaChamadoInstance extends Sequelize.Instance<ProblemaChamadoAttributes> {}

export interface ProblemaChamadoModel extends BaseModelInterface, Sequelize.Model<ProblemaChamadoInstance, ProblemaChamadoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ProblemaChamadoModel => {
  const problemaChamado: ProblemaChamadoModel = sequelize.define('ProblemaChamado', {
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
    geraCobranca: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
    valorCobrado: {
      defaultValue: 0,
      type: dataTypes.FLOAT,
    },
  });

  problemaChamado.associate = (models: ModelsInterface) => {
    problemaChamado.hasMany(models.Chamado, {
      foreignKey: {
        allowNull: true,
        field: 'problema',
        name: 'problema',
      },
    });
  };

  return problemaChamado;
};
