const mongoose = require('mongoose');
const ContaBancariaSchema = require('../schema/ContaBancariaSchema');

module.exports = mongoose.model('ContaBancaria', ContaBancariaSchema);
