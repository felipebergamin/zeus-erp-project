import * as mongoose from 'mongoose';
import debug = require('../debug');
import autoIncrement = require('./plugins/auto-increment');

export = mongoose.connect(process.env.DB_STR);
