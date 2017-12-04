const mongoose = require('mongoose');
const schema = require('../schema/ClienteSchema');

module.exports = mongoose.model('Cliente', schema);
