import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
let db = null;

if (!db) {
  db = {};

  const operatorsAliases = {
    $and: Sequelize.Op.and
  };

  const sequelize: Sequelize.Sequelize = new Sequelize(
    'zeusacetech',
    'acetech',
    '*Ace2018',
    {
      dialect: 'mysql',
      host: 'zeusacetech.mysql.uhserver.com',
      operatorsAliases,
      timezone: 'America/Sao_Paulo',
    }
  );

  fs.readdirSync(__dirname)
    .filter((file: string) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model['name']] = model;
    });

  Object.keys(db)
    .forEach((modelName: string) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

  db['sequelize'] = sequelize;
}

export default db as DbConnection;
