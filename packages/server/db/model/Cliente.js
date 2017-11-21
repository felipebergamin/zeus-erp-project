const mongoose = require('mongoose');
const ClientSchema = require('../schema/ClienteSchema');

module.exports = mongoose.model('Cliente', ClientSchema);