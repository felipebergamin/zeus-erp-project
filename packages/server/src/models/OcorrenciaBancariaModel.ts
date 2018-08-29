import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface OcorrenciaBancariaAttributes {
  _id?: number;

  idOcorrencia?: string;
  dataOcorrenciaNoBanco?: Date;
  bancoCobrador?: string;
  agenciaCobradora?: string;
  valorPago?: number;
  jurosMora?: number;
  dataCredito?: Date;
  motivosOcorrencia?: string;
  dataHora?: Date;

  boleto?: number;
  arquivoRetorno?: number;
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
    agenciaCobradora: {
      type: dataTypes.STRING(5),
    },
    bancoCobrador: {
      type: dataTypes.STRING(3),
    },
    dataCredito: {
      type: dataTypes.DATEONLY,
    },
    dataHora: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    dataOcorrenciaNoBanco: {
      allowNull: false,
      type: dataTypes.DATEONLY,
    },
    idOcorrencia: {
      allowNull: false,
      type: dataTypes.STRING(2),
    },
    jurosMora: {
      type: dataTypes.FLOAT(10, 2),
    },
    motivosOcorrencia: {
      type: dataTypes.STRING,
    },
    valorPago: {
      type: dataTypes.FLOAT(10, 2),
    },
  }, {
    tableName: 'ocorrenciasbancarias',
    timestamps: false,
  });

  ocorrencia.associate = (models: ModelsInterface) => {
    ocorrencia.belongsTo(models.Boleto, {
      foreignKey: {
        allowNull: true,
        field: 'boleto',
        name: 'boleto',
      }
    });

    ocorrencia.belongsTo(models.ArquivoRetorno, {
      foreignKey: {
        allowNull: false,
        field: 'arquivoRetorno',
        name: 'arquivoRetorno',
      },
    });
  };

  return ocorrencia;
};
