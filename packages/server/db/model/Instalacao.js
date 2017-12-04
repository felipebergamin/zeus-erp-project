const mongoose = require('mongoose');
const schema = require('../schema/InstalacaoSchema');

module.exports = mongoose.model('Instalacao', schema);
