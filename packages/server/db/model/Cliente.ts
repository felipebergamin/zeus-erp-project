import mongoose = require('mongoose');
import schema = require('../schema/ClienteSchema');

export = mongoose.model('Cliente', schema);
