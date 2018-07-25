import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface ClienteAttributes {
  _id: number;

  /* informações pessoa */
  cpfCnpj: string;
  dataNascimento: Date;
  nome: string;
  rgIe: string;
  tags: string;
  tipoPessoa: string;

  /* informações de contato */
  email: string;
  numeroCelular: string;
  telefoneFixo: string;

  /* informações de endereço */
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  latitude: number;
  logradouro: number;
  longitude: number;
  numero: number;

  /* informações financeiras */
  autoBloquear: boolean;
  contaBancaria: number;
  diaVencimento: number;
  observacoes: string;
}

export interface ClienteInstance extends Sequelize.Instance<ClienteAttributes> {}

export interface ClienteModel extends BaseModelInterface, Sequelize.Model<ClienteInstance, ClienteAttributes> {
}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ClienteModel => {
  const cliente: ClienteModel = sequelize.define('Cliente', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    cpfCnpj: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    dataNascimento: {
      allowNull: false,
      type: dataTypes.DATE,
    },
    nome: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    rgIe: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    tags: {
      defaultValue: '',
      type: dataTypes.STRING,
    },
    tipoPessoa: {
      allowNull: false,
      type: dataTypes.ENUM(['fisica', 'juridica']),
    },

    email: {
      allowNull: true,
      type: dataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'O e-mail é inválido',
        }
      },
    },
    numeroCelular: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    telefoneFixo: {
      allowNull: true,
      type: dataTypes.STRING,
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

    /* informações financeiras */
    autoBloquear: {
      defaultValue: true,
      type: dataTypes.BOOLEAN,
    },
    diaVencimento: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    observacoes: {
      type: dataTypes.TEXT,
    }

  }, {
    paranoid: true,
    tableName: 'cliente',
  });

  cliente.associate = (models: ModelsInterface) => {
    cliente.hasMany(models.Boleto, {
      foreignKey: {
        allowNull: false,
        field: 'cliente',
        name: 'cliente',
      }
    });
  };

  return cliente;
};
