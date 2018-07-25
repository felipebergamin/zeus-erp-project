import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface ContaBancariaAttributes {
  _id: number;

  digitoAgencia: string;
  numeroAgencia: string;
  carteira: string;
  cedente: string;
  codigoCedente: string;

  digitoConta: string;
  numeroConta: number;

  excluido: boolean;
  multaDia: number;
  multaVencimento: number;
  nome: string;
  nossoNumero: number;
  proximaRemessa: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ContaBancariaInstance extends Sequelize.Instance<ContaBancariaAttributes> {

}

export interface ContaBancariaModel extends BaseModelInterface, Sequelize.Model<ContaBancariaInstance, ContaBancariaAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ContaBancariaModel => {
  const contaBancaria: ContaBancariaModel = sequelize.define('ContaBancaria', {

    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    carteira: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    cedente: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    codigoCedente: {
      allowNull: false,
      type: dataTypes.STRING,
    },

    digitoAgencia: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    numeroAgencia: {
      allowNull: false,
      type: dataTypes.STRING,
    },

    digitoConta: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    numeroConta: {
      allowNull: false,
      type: dataTypes.STRING,
    },

    multaDia: {
      allowNull: false,
      type: dataTypes.FLOAT,
    },
    multaVencimento: {
      allowNull: false,
      type: dataTypes.FLOAT,
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    nossoNumero: {
      defaultValue: 0,
      type: dataTypes.BIGINT.UNSIGNED,
    },
    proximaRemessa: {
      defaultValue: 1,
      type: dataTypes.INTEGER,
    }

  }, {
    paranoid: true,
    tableName: 'contasbancarias',
  });

  contaBancaria.associate = (models: ModelsInterface): void => {
    contaBancaria.hasMany(models.Cliente, {
      foreignKey: {
        allowNull: false,
        field: 'contaBancaria',
        name: 'contaBancaria',
      }
    });

    contaBancaria.hasMany(models.Boleto, {
      foreignKey: {
        allowNull: false,
        field: 'contaBancaria',
        name: 'contaBancaria',
      }
    });

    contaBancaria.hasMany(models.ArquivoRemessa, {
      foreignKey: {
        allowNull: false,
        field: 'contaBancaria',
        name: 'contaBancaria',
      }
    });

    contaBancaria.hasMany(models.ArquivoRetorno, {
      foreignKey: {
        allowNull: false,
        field: 'contaBancaria',
        name: 'contaBancaria',
      }
    });
  };

  return contaBancaria;
};
