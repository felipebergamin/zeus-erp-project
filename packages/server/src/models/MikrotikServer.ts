import * as Sequelize from 'sequelize';

export interface MikrotikRouterAttributes {
  id?: string;
  ipAddress?: string;
  username?: string;
  password?: string;
  apiPort?: number;
  systemName?: string;
  radiusSecret?: string;
}

export interface MikrotikRouterInstance extends Sequelize.Instance<MikrotikRouterAttributes> {}

export interface MikrotikRouterModel extends Sequelize.Model<MikrotikRouterInstance, MikrotikRouterAttributes> {
}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): MikrotikRouterModel => {
  const model: MikrotikRouterModel = sequelize.define('MikrotikRouter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    apiPort: {
      defaultValue: 8728,
      type: dataTypes.INTEGER,
    },
    ipAddress: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    radiusSecret: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    systemName: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: dataTypes.STRING,
    },
  }, {
    tableName: 'mikrotikrouters',
  });

  return model;
};
