const mongoose = require('mongoose');
const schema = require('../schema/TecnicoSchema');

module.exports = mongoose.model('Tecnico', schema);
