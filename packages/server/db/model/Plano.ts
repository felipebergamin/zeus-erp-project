import mongoose = require('mongoose');
import schema = require('../schema/PlanoSchema');

export = mongoose.model('Plano', schema);
