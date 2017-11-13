const mongoose = require('mongoose');
const ClientSchema = require('../schema/ClientSchema');

module.exports = mongoose.model('Client', ClientSchema);