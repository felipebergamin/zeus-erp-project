const mongoose = require('mongoose');
const BoletoBancarioSchema = require('../schema/BoletoBancarioSchema');

module.exports = mongoose.model('BoletoBancario', BoletoBancarioSchema);