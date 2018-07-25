import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface OcorrenciaBancariaAttributes {
  _id?: number;
  dataHora?: Date;
  ocorrencia?: string;
  descricaoOcorrencia?: string;
  motivoOcorrencia?: string;
  boleto?: number;
}

export interface OcorrenciaBancariaInstance extends Sequelize.Instance<OcorrenciaBancariaAttributes> {}

export interface OcorrenciaBancariaModel extends BaseModelInterface, Sequelize.Model<OcorrenciaBancariaInstance, OcorrenciaBancariaAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): OcorrenciaBancariaModel => {
  const ocorrencia: OcorrenciaBancariaModel = sequelize.define('OcorrenciaBancaria', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    dataHora: {
      defaultValue: Sequelize.NOW,
      type: dataTypes.DATE,
    },
    descricaoOcorrencia: {
      type: dataTypes.STRING,
    },
    motivoOcorrencia: {
      type: dataTypes.STRING,
    },
    ocorrencia: {
      type: dataTypes.STRING,
    },
  });

  ocorrencia.associate = (models: ModelsInterface) => {
    ocorrencia.belongsTo(models.Boleto, {
      foreignKey: {
        allowNull: false,
        field: 'boleto',
        name: 'boleto',
      }
    });
  };

  return ocorrencia;
};
