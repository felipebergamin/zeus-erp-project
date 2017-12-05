import mongoose = require('mongoose');
import schema = require('../schema/TecnicoSchema');

export = mongoose.model('Tecnico', schema);
