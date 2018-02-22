import * as mongoose from 'mongoose';
import debug = require('../debug');
import autoIncrement = require('./plugins/auto-increment');

export = mongoose.connect('mongodb://localhost/zeus');
