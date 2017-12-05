import mongoose = require('mongoose');
import schema = require('../schema/ContaBancariaSchema');

export = mongoose.model('ContaBancaria', schema);
