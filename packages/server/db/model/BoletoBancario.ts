import mongoose = require('../connection');
import schema = require('../schema/BoletoBancarioSchema');

export = mongoose.model('BoletoBancario', schema);
