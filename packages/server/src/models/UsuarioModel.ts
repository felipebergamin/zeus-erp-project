import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface UsuarioAttributes {
  _id?: number;
  email?: string;
  login?: string;
  nome?: string;
  passwd?: string;
  perfil?: number;
  telegramID?: string;
  tipo?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UsuarioInstance extends Sequelize.Instance<UsuarioAttributes> {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UsuarioModel extends BaseModelInterface, Sequelize.Model<UsuarioInstance, UsuarioAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): UsuarioModel => {
  const usuario: UsuarioModel = sequelize.define('Usuario', {
    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    email: {
      type: dataTypes.STRING
    },
    login: {
      type: dataTypes.STRING
    },
    nome: {
      type: dataTypes.STRING
    },
    passwd: {
      type: dataTypes.STRING
    },
    telegramID: {
      type: dataTypes.STRING
    },
    tipo: {
      allowNull: false,
      type: dataTypes.ENUM([ 'tecnico', 'gerente', 'atendente', 'desenvolvedor', 'outro' ]),
    }
  }, {
    paranoid: true,

    hooks: {
      beforeCreate: (user: UsuarioInstance, options: Sequelize.CreateOptions): void => {
        const salt = genSaltSync();
        user.set('passwd', hashSync(user.get('passwd'), salt));
      },
      beforeUpdate: (user: UsuarioInstance, options: Sequelize.CreateOptions): void => {
        if (user.changed('passwd')) {
          const salt = genSaltSync();
          user.set('passwd', hashSync(user.get('passwd'), salt));
        }
      }
    }
  });

  usuario.associate = (models: ModelsInterface) => {
    usuario.hasMany(models.Chamado, {
      foreignKey: {
        allowNull: false,
        field: 'abertoPor',
        name: 'abertoPor',
      }
    });

    usuario.hasMany(models.Chamado, {
      foreignKey: {
        allowNull: true,
        field: 'tecnico',
        name: 'tecnico',
      }
    });
  };

  usuario.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
    return compareSync(password, encodedPassword);
  };

  return usuario;
};
