import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PontoAcessoAttributes {
  _id: number;

  autoAtrelarMac: boolean;
  ipAddress: string;
  login: string;
  macAddress: string;
  macOnu: string;
  olt: number;
  passwd: string;
  ponNo: number;
  slotNo: number;

  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  latitude: number;
  logradouro: string;
  longitude: number;
  numero: string;

  incluirNaCobranca: boolean;
  plano: number;
  cliente: number;
}

export interface PontoAcessoInstance extends Sequelize.Instance<PontoAcessoAttributes> {}

export interface PontoAcessoModel extends BaseModelInterface, Sequelize.Model<PontoAcessoInstance, PontoAcessoAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PontoAcessoModel => {
  const pontoAcesso: PontoAcessoModel = sequelize.define('PontoAcesso', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    autoAtrelarMac: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    ipAddress: {
      allowNull: true,
      type: dataTypes.STRING,
      validate: {
        isIPv4: {
          msg: 'O endereço IP tem um valor inválido',
        }
      },
    },
    login: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    macAddress: {
      allowNull: true,
      type: dataTypes.STRING,
    },
    macOnu: {
      allowNull: true,
      type: dataTypes.STRING,
    },

    incluirNaCobranca: {
      defaultValue: true,
      type: dataTypes.BOOLEAN,
    },
    passwd: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    ponNo: {
      allowNull: true,
      type: dataTypes.INTEGER,
    },
    slotNo: {
      allowNull: true,
      type: dataTypes.INTEGER,
    },

    bairro: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    cep: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    cidade: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    complemento: {
      allowNull: true,
      type: dataTypes.STRING,
    },
    estado: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    latitude: {
      type: dataTypes.FLOAT,
    },
    logradouro: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    longitude: {
      type: dataTypes.FLOAT,
    },
    numero: {
      allowNull: false,
      type: dataTypes.STRING,
    },
  });

  pontoAcesso.associate = (models: ModelsInterface) => {
    pontoAcesso.belongsTo(models.Cliente, {
      foreignKey: {
        allowNull: false,
        field: 'cliente',
        name: 'cliente',
      }
    });

    pontoAcesso.belongsTo(models.Plano, {
      foreignKey: {
        allowNull: false,
        field: 'plano',
        name: 'plano',
      }
    });
  };

  return pontoAcesso;
};
