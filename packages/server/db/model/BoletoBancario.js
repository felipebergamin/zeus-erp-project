const mongoose = require('mongoose');
const schema = require('../schema/BoletoBancarioSchema');

module.exports = mongoose.model('BoletoBancario', schema);
